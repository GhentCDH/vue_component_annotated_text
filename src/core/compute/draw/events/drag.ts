import { drag } from "d3";
import { SVG_ID, SvgModel } from "../../model/svg.types";
import {
  AnnotationDraw,
  Dimensions,
  TextAnnotationModel,
} from "../../annotation.model";
import { TextAnnotation } from "../../../model";
import { AnnotationEventType } from "../../../events/events";
import { editAnnotations } from "../annotations/edit";
import { recreateAnnotation, removeDummyAnnotation } from "../annotations/draw";

export const drawAnnotationHandles = (
  annotation: AnnotationDraw,
  svgModel: SvgModel,
) => {
  if (annotation.path.border) {
    // TODO add condition to check if annotation is draggable

    if (annotation.draggable.start) {
      drawHandle(svgModel, annotation, annotation.draggable.start, "start");
    }

    if (annotation.draggable.end) {
      drawHandle(svgModel, annotation, annotation.draggable.end, "end");
    }
  }
};

export const drawHandle = (
  svgModel: SvgModel,
  annotation: AnnotationDraw,
  dimensions: Dimensions,
  target: "start" | "end",
) => {
  const model = svgModel.model as TextAnnotationModel;
  const config = svgModel.annotationAdapter.config;
  const handleRadius = config.text.handleRadius;
  let dragResult: TextAnnotation = null;
  const onDragEnd = (event) => {
    model.blockEvents = false;
    removeDummyAnnotation(svgModel);

    svgModel.sendEvent(
      {
        event: "annotation-edit--end",
        mouseEvent: event,
        annotationUuid: annotation?.uuid || "",
      },
      { annotation: dragResult },
    );

    if (!dragResult) return;

    const originalAnnotation = svgModel.model.getAnnotation(
      annotation.annotationUuid,
    );
    dragResult.weight = originalAnnotation.weight;
    // On annotation end the dummy annotation is removed,
    // and the existing annotation replaced by the new one
    recreateAnnotation(svgModel, dragResult);
  };

  const onDrag = (eventType: AnnotationEventType) => (event) => {
    if (!svgModel.annotationAdapter.edit) return;
    const x = event.sourceEvent.clientX;
    const y = event.sourceEvent.clientY;

    dragResult =
      editAnnotations(svgModel, x, y, annotation, target, handle, eventType) ??
      dragResult;
  };

  const width = handleRadius;
  const handle = svgModel.handles
    .append("rect")
    .attr(SVG_ID.ANNOTATION_UID, annotation.annotationUuid)
    .attr(SVG_ID.ANNOTATION_ROLE, "handle")
    .attr("width", width)
    .attr("height", dimensions.height)
    .attr("fill", "gray")
    .attr("opacity", 0)
    .attr("x", dimensions.x - width / 2)
    .attr("y", dimensions.y)
    .call(
      drag()
        .on("drag", onDrag("annotation-edit--move"))
        .on("start", onDrag("annotation-edit--start"))
        .on("end", onDragEnd),
    );
  handle.on("mouseenter", () => {
    handle.attr("class", svgModel.annotationAdapter.edit ? "handle" : "");
  });
  return handle;
};
