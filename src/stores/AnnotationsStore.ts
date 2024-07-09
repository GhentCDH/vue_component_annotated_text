import { defineStore } from "pinia";
import {
  AnnotatedTextProps,
  Annotation,
  AnnotationActionPayload,
  AnnotationActionState,
  CreateAnnotationState,
  WordPart,
} from "@/types";
import { ref } from "vue-demi";
import AnnotatedLinesUtil from "@/lib/annotatedTextUtils/AnnotatedLinesUtil";
import { createPositionFromPoint } from "@/lib/DomUtils";

export const useAnnotationsStore = defineStore("annotations", {
  state: () => ({
    props: undefined as AnnotatedTextProps,
    annotationsState: {
      action: null,
      handlePosition: null,
      annotation: null,
      origEnd: null,
      origStart: null,
      newEnd: null,
      newStart: null,
    } as AnnotationActionState,
    createAnnotationState: {
      start: null,
      end: null,
      target: null,
    } as CreateAnnotationState,
    changes: {},
    linesUtil: undefined as AnnotatedLinesUtil,
  }),

  getters: {
    annotatedLines: (state) => state.linesUtil.annotatedLines,
  },

  actions: {
    // init
    init(props: AnnotatedTextProps) {
      this.props = props;
      this.initActionState();
      this.initCreateState();
      this.linesUtil = new AnnotatedLinesUtil(
        props,
        ref(this.annotationsState),
        ref(this.changes)
      );
    },
    initActionState() {
      this.annotationsState = {
        action: null,
        handlePosition: null,
        annotation: null,
        origEnd: null,
        origStart: null,
        newEnd: null,
        newStart: null,
      };
    },
    initCreateState() {
      this.createAnnotationState = {
        start: null,
        end: null,
        target: null,
      };
    },

    // Events
    onMouseLeaveHandler(e: MouseEvent) {
      // reset state?
      if (this.annotationsState.action) {
        this.initActionState();
      }
      console.log("global mouseleave");
    },

    onAnnotationStartHandler(e: MouseEvent, payload: AnnotationActionPayload) {
      console.log(`start resize (${payload.action})`);
      this.annotationsState = {
        ...payload,
        origStart: payload.annotation.start,
        origEnd: payload.annotation.end,
        newStart: payload.annotation.start,
        newEnd: payload.annotation.end,
      };
    },

    onMouseEnterLinePartHandler(wordPart: WordPart, e: MouseEvent) {
      const position = createPositionFromPoint(e.x, e.y);
      if (position) {
        if (this.annotationsState.annotation) {
          const newPosition = wordPart.start + position.offset;
          const offset = newPosition - this.annotationsState.handlePosition;
          switch (this.annotationsState.action) {
            case "moveEnd":
              if (newPosition >= this.annotationsState.annotation.start) {
                this.annotationsState.newEnd = newPosition;
                this.changes[this.annotationsState.annotation.id] = {
                  start: this.annotationsState.newStart,
                  end: this.annotationsState.newEnd,
                };
              }
              break;
            case "moveStart":
              if (newPosition <= this.annotationsState.annotation.end) {
                this.annotationsState.newStart = newPosition;
                this.changes[this.annotationsState.annotation.id] = {
                  start: this.annotationsState.newStart,
                  end: this.annotationsState.newEnd,
                };
              }
              break;
            case "move":
              this.annotationsState.newStart =
                this.annotationsState.origStart + offset;
              this.annotationsState.newEnd =
                this.annotationsState.origEnd + offset;
              this.changes[this.annotationsState.annotation.id] = {
                start: this.annotationsState.newStart,
                end: this.annotationsState.newEnd,
              };
              break;
          }
        }
      }
    },

    onStartSelect(position: number) {
      this.createAnnotationState.start = position;
      this.createAnnotationState.target = "span";
      console.log(this.createAnnotationState);
    },

    onEndSelect(length: number, text: string) {
      if (this.createAnnotationState.start) {
        this.createAnnotationState.end =
          this.createAnnotationState.start + length;
        console.log("select state");
        console.log(this.createAnnotationState);

        const anno: Annotation = {
          id: Math.random().toString().slice(2, 12),
          start: this.createAnnotationState.start,
          end: this.createAnnotationState.end,
          text: text,
          class: "annotation annotation--color-8",
          label: "label",
          target: this.createAnnotationState.target,
        };

        this.props.annotations.push(anno);
        this.changes[anno.id] = {
          start: this.createAnnotationState.start,
          end: this.createAnnotationState.end,
        };
        console.log(this.changes);
      }
    },
  },
});