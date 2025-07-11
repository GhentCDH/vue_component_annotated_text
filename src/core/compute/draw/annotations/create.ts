import { pointer } from "d3";
import {
  drawDummyAnnotation,
  getCharacterFromTextNodesAtPoint,
  recreateAnnotation,
  removeDummyAnnotation,
} from "./draw";
import { Debugger } from "../../../utils/debugger";
import { SvgModel } from "../../model/svg.types";
import { type TextAnnotation } from "../../../model";

export const createNewBlock = (svgModel: SvgModel) => {
  const container = svgModel.textElement;

  const svg = svgModel.svg;
  const adapter = svgModel.annotationAdapter;

  let startIndex: number;
  let drawing = false;
  let drawingAndMove = false;
  let dummyAnnotation: TextAnnotation | null = null;

  const createDummyAnnotation = (event, draw = false) => {
    const [clientX, clientY] = pointer(event);
    // const [x, y] = pointer(event);
    const x = clientX + container.getBoundingClientRect().x;
    const y = clientY + container.getBoundingClientRect().y;
    const character = getCharacterFromTextNodesAtPoint(x, y, svgModel);
    if (!character) return;
    const newIndex = character.newIndex;
    if (!dummyAnnotation) {
      dummyAnnotation = {
        ...adapter.createAnnotation(),
        weight: 1,
        start: newIndex,
        end: newIndex + 5,
      } as unknown as TextAnnotation;
      startIndex = newIndex;
    }

    const isStart = newIndex > startIndex;
    const _start = isStart ? newIndex : startIndex;
    const _end = !isStart ? newIndex : startIndex;

    dummyAnnotation.start = Math.min(_start, _end);
    dummyAnnotation.end = Math.max(_start, _end);

    const snapper = svgModel.annotationAdapter.snapper.fixOffset(
      _start < _end ? "move-start" : "move-end",
      dummyAnnotation,
    );
    dummyAnnotation.start = snapper.start;
    dummyAnnotation.end = snapper.end;

    if (draw)
      drawDummyAnnotation(svgModel, dummyAnnotation, {
        border: dummyAnnotation.color.border,
        fill: dummyAnnotation.color.background,
      });

    return { x, y };
  };

  svg.on("mousedown", (event) => {
    if (!svgModel.annotationAdapter.create) return null;
    if (svgModel.model.blockEvents || drawing) return;
    dummyAnnotation = null;
    drawing = true;
    createDummyAnnotation(event);

    if (!dummyAnnotation) {
      console.warn("no character found");
      return;
    }

    svgModel.sendEvent(
      {
        event: "annotation-create--start",
        mouseEvent: event,
        annotationUuid: dummyAnnotation?.id || "",
      },
      { annotation: dummyAnnotation },
    );
  });

  svg.on("mousemove", (event) => {
    if (!drawing) return;

    svgModel.model.blockEvents = true;
    drawingAndMove = true;
    createDummyAnnotation(event, true);

    svgModel.sendEvent(
      {
        event: "annotation-create--move",
        mouseEvent: event,
        annotationUuid: dummyAnnotation?.id || "",
      },
      { annotation: dummyAnnotation },
    );
  });

  svg.on("mouseup", (mouseEvent) => {
    drawing = false;

    if (!drawingAndMove) return;

    drawingAndMove = false;
    svgModel.model.blockEvents = false;
    removeDummyAnnotation(svgModel);

    if (!dummyAnnotation) {
      Debugger.warn("no dummy annotation found, canceling");
      return;
    }

    recreateAnnotation(svgModel, dummyAnnotation);

    svgModel.sendEvent(
      {
        event: "annotation-create--end",
        mouseEvent,
        annotationUuid: dummyAnnotation?.id || "",
      },
      { annotation: dummyAnnotation },
    );
    dummyAnnotation = null;
  });
};
