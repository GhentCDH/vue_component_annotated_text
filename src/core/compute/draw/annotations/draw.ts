import { pick } from "lodash-es";
import {
  AnnotationDrawColor,
  TextAnnotationModel,
} from "../../annotation.model";
import { type TextAnnotation } from "../../../model";
import { DUMMY_UID, SvgModel } from "../../model/svg.types";
import {
  getLinesForAnnotation,
  reAssignAnnotationToLine,
} from "../../2_assign_annotation_to_line";
import {
  createAndAssignDrawAnnotation,
  createTextAnnotation,
} from "../../4_compute_positions";
import { drawAnnotation, drawAnnotationContent } from "../annotations";
import {
  findLineElement,
  insideRange,
  isInsideBoundingRect,
} from "../utils/bounding-rect";

export function getCharacterFromTextNodesAtPoint(
  x: number,
  y: number,
  svg: SvgModel,
) {
  const container = svg.textElement;
  const model = svg.model as TextAnnotationModel;
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null,
  );
  let node: Text | null;

  while ((node = walker.nextNode() as Text | null)) {
    // Check if position is inside the text node
    if (!node.textContent) continue;
    const parentRect = node.parentElement.getBoundingClientRect();
    if (!isInsideBoundingRect(x, y, node.parentElement.getBoundingClientRect()))
      continue;
    const { lineUid, offset } = findLineElement(node);

    if (!lineUid) {
      console.warn("no line found at", lineUid);
      continue;
    }

    const line = model.getLine(lineUid!);

    // search the character in the text node
    const text = node.textContent!;
    // const { lineUid, offset } = findLineElement(node);

    for (let i = 0; i < text.length; i++) {
      const range = document.createRange();
      range.setStart(node, i);
      range.setEnd(node, i + 1);

      const rects = [range.getBoundingClientRect()];
      for (const rect of rects) {
        if (insideRange(rect.left, rect.right, x)) {
          const parentDimensions = pick(
            container.getBoundingClientRect(),
            "width",
            -"height",
            "x",
            "y",
          );

          const newIndex = line.start + i + offset;

          const dimensions = {
            x: rect.x - parentDimensions.x,
            y: rect.y - parentDimensions.y,
          };

          return {
            offset: i,
            newIndex,
            dimensions,
            line,
          };
        }
      }
    }
  }

  return null;
}

export const removeDummyAnnotation = (svgModel: SvgModel) => {
  svgModel.removeAnnotations(DUMMY_UID);
};

export const drawDummyAnnotation = (
  svgModel: SvgModel,
  dummyAnnotation: TextAnnotation,
  color?: AnnotationDrawColor,
) => {
  svgModel.removeAnnotations(DUMMY_UID);
  const { model, textElement } = svgModel;
  const lines = getLinesForAnnotation(model.lines, dummyAnnotation);

  createTextAnnotation(
    lines,
    textElement.getBoundingClientRect(),
    model,
    dummyAnnotation,
    svgModel.textAdapter,
    svgModel.annotationAdapter,
  ).forEach((a) => {
    drawAnnotationContent(
      { ...a, annotationUuid: DUMMY_UID },
      svgModel,
      svgModel.annotationAdapter.config,
    );
  });

  svgModel.colorAnnotation(DUMMY_UID, color);
};

export const recreateAnnotation = (
  svgModel: SvgModel,
  annotation: TextAnnotation,
) => {
  const { model } = svgModel;
  svgModel.removeAnnotations(annotation.id);

  reAssignAnnotationToLine(model, annotation, true);
  createAndAssignDrawAnnotation(
    model,
    svgModel.textElement,
    annotation,
    svgModel.annotationAdapter,
    svgModel.textAdapter,
  )
    .getDrawAnnotations(annotation.id)
    .forEach((a) => {
      drawAnnotation(svgModel, a);
    });
};
