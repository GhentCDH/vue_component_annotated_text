-
<template>
  <div
    v-if="linesUtil.annotatedLines.value.length"
    :class="[
      'annotated-text',
      `theme-${theme}`,
      `annotated-text--render-${render}`,
      {
        'annotated-text--show-labels': showLabels,
        'action--active': updateState.action,
      },
      updateState.action ? `action--${updateState.action}` : '',
    ]"
    @mouseleave="onMouseLeave($event)"
    @mouseup="onMouseUp($event)"
  >
    <template v-for="line in linesUtil.annotatedLines.value" :key="line">
      <!-- gutter annotations -->
      <annotated-gutters
        :gutter="line.gutter"
        :annotation-style="style"
        @annotation-click="onClick"
        @annotation-double-click="onDoubleClick"
      />
      <!-- line -->
      <div class="content">
        <AnnotatedLine
          :line="line"
          :allow-edit="allowEdit"
          :allow-create="allowCreate"
          :annotation-classes="annotationClasses"
          :render="render"
          @annotation-click="onClick"
          @annotation-double-click="onDoubleClick"
          @annotation-mouse-move="onMouseMove"
        >
          <template #annotation-before="slotProps">
            <slot
              name="annotation-before"
              :annotation="slotProps.annotation"
            ></slot>
          </template>
          <template #annotation-after="slotProps">
            <slot name="annotation-after" :annotation="slotProps.annotation" />
          </template>
        </AnnotatedLine>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch, watchEffect } from "vue";
import AnnotatedLine from "./AnnotatedLine.vue";
import AnnotatedGutters from "./gutter/AnnotatedGutters.vue";
import { createPositionFromPoint } from "../utils/dom";
import { CssClassesUtil } from "../utils/annotatedTextUtils";
import { UserActionState, useStateObjectsStore } from "../state";
import AnnotatedLinesUtil from "../utils/annotatedTextUtils/AnnotatedLinesUtil";
import type { AnnotationInternal } from "../types/Annotation";
import { hasCustomEventListener } from "../utils/events";
import { Debugger } from "../utils/debugger";
import type { AnnotatedTextProps, MouseEventPayload } from "@/types/props";
import type { AnnotatedTextEmits } from "@/types/emits";

// init props
/**
 * @ignore
 */
let props = withDefaults(defineProps<AnnotatedTextProps>(), {
  annotations: () => [],
  selectedAnnotations: () => [],
  hoveredAnnotations: () => [],
  lines: () => [],
  annotationOffset: 0,
  debug: false,
  verbose: false,
  theme: "default",
  render: "nested",
  display: "text",
  showLabels: false,
  autoAnnotationWeights: true,
  allowEdit: false,
  allowCreate: false,
  righToLeft: false,
  style: () => ({
    defaultClass: "annotation",
    activeClass: "annotation--active",
    startClass: "annotation--start",
    endClass: "annotation--end",
    weightClass: "annotation--weight-",
    transitioningClass: "annotation--transitioning",
    shadowClass: "annotation--shadow",
    hoveredClass: "annotation--hover",
  }),
});

props = reactive(props);
// define emits
const emit = defineEmits<AnnotatedTextEmits>();

const statesStore = useStateObjectsStore();

const { updateState, createState, userState, hoverState } = statesStore;

const userStateLabel = computed(() => userState.value.state);

const linesUtil = new AnnotatedLinesUtil(
  props,
  updateState.value,
  createState.value,
);

watchEffect(() => {
  Debugger.setDebug(props.debug);
  Debugger.setVerbose(props.verbose);
});

// Check event listeners
const hasUpdateBeginListener = hasCustomEventListener("annotationUpdateBegin");
const hasUpdatingListener = hasCustomEventListener("annotationUpdating");
const hasUpdateEndListener = hasCustomEventListener("annotationUpdateEnd");
const hasCreateBeginListener = hasCustomEventListener("annotationCreateBegin");
const hasCreatingListener = hasCustomEventListener("annotationCreating");
const hasCreateEndListener = hasCustomEventListener("annotationCreateEnd");
const hasKeyPressedListener = hasCustomEventListener("keyPressed");
const hasClickHandler = hasCustomEventListener("annotationClick");
const hasDoubleClickHandler = hasCustomEventListener("annotationDoubleClick");

// Init util to handle css classes
const cssClassUtil = new CssClassesUtil(props, updateState.value);
const annotationClasses = cssClassUtil.annotationClasses;

/* user state event */
watch(userStateLabel, (nv, ov) => {
  Debugger.verbose("user-action-state-change", ov, nv);
  emit("user-action-state-change", ov, nv);
});

/* keyboard events */
if (typeof window !== "undefined") {
  window.addEventListener("keyup", (keyEv: KeyboardEvent) => {
    if (hasKeyPressedListener) {
      Debugger.verbose(
        "key-pressed",
        keyEv.key,
        updateState.value,
        createState.value,
      );
      emit(
        "key-pressed",
        keyEv,
        updateState.value,
        createState.value,
        userState.value,
      );
    } else {
      switch (keyEv.key) {
        case "Escape":
          updateState.value.resetUpdate();
      }
    }
  });
}

/* mouse event handlers */
const onMouseDownHandlers = new Map<
  UserActionState,
  (e: MouseEvent, payload?: MouseEventPayload) => void
>();
const onMouseUpHandlers = new Map<UserActionState, (e: MouseEvent) => void>();
const onMouseMoveHandlers = new Map<
  UserActionState,
  (e: MouseEvent, payload?: MouseEventPayload) => void
>();

function onClick(e: MouseEvent, payload?: MouseEventPayload) {
  Debugger.verbose("@onClick", "userState:", userState.value.state, payload);
  onMouseDownHandlers.get(userState.value.state)?.(e, payload);
  emit("annotation-click", payload, e);
}

function onDoubleClick(e: MouseEvent, payload?: MouseEventPayload) {
  Debugger.verbose(
    "@onDoubleClick",
    "userState:",
    userState.value.state,
    payload,
  );
  e.preventDefault();
  emit("annotation-double-click", payload, e);
}

function onMouseMove(e: MouseEvent, payload?: MouseEventPayload) {
  Debugger.verbose(
    "@onMouseMove",
    "userState:",
    e,
    userState.value.state,
    payload,
    payload?.annotation?.id,
  );
  onMouseMoveHandlers.get(userState.value.state)?.(e, payload);
}

function onMouseUp(e: MouseEvent) {
  Debugger.verbose("@onMouseUp", "userState:", userState.value.state);
  onMouseUpHandlers.get(userState.value.state)?.(e);
}

function onMouseLeave(e: MouseEvent, payload?: MouseEventPayload) {
  Debugger.verbose("@onMouseLeave", "userState:", userState.value.state);
  if (updateState.value.updating) {
    updateState.value.resetUpdate();
  }
  if (createState.value.creating) {
    createState.value.resetCreating();
  }
}

onMouseDownHandlers.set(
  UserActionState.IDLE,
  (e: MouseEvent, payload?: MouseEventPayload) => {
    if (payload?.annotation) {
      userState.value.state = UserActionState.START_SELECT;
      userState.value.payload = payload;
      return;
    }

    const startOffset = payload?.startOffset ?? null;

    if (startOffset >= 0) {
      userState.value.state = UserActionState.START_CREATE;
      userState.value.payload = payload;
      return;
    }
  },
);

onMouseUpHandlers.set(UserActionState.START_SELECT, (e: MouseEvent) => {
  // emit select event
  Debugger.verbose("annotation-select", userState.value.payload.annotation);
  emit("annotation-select", userState.value.payload.annotation, e);
  // reset user state
  userState.value.reset();
});

onMouseUpHandlers.set(UserActionState.START_CREATE, (e: MouseEvent) => {
  // reset user state
  userState.value.reset();
});

// Annotation CREATION events

// USER STATE start_create + MOUSE EVENT move => USER STATE creating (if allowed)
onMouseMoveHandlers.set(
  UserActionState.START_CREATE,
  (e: MouseEvent, payload?: MouseEventPayload) => {
    if (props.allowCreate) {
      const position =
        payload.startOffset + createPositionFromPoint(e.x, e.y).offset;
      createState.value.startCreating(position);

      if (hasCreateBeginListener) {
        Debugger.verbose("*emit annotation-create-begin", createState.value);
        emit("annotation-create-begin", createState.value);
      } else {
        createState.value.init();
      }

      // update user state
      userState.value.state = UserActionState.CREATING;
    }
  },
);

// USER STATE creating + MOUSE EVENT mousemove => continue creating, update positions
onMouseMoveHandlers.set(
  UserActionState.CREATING,
  (e: MouseEvent, payload?: MouseEventPayload) => {
    const position = createPositionFromPoint(e.x, e.y);
    if (position) {
      const newPosition = payload.startOffset + position.offset;
      if (createState.value.newStart <= newPosition) {
        createState.value.newEnd = newPosition;
        if (hasCreatingListener) {
          Debugger.verbose("*emit annotation-creating", createState.value);
          emit("annotation-creating", createState.value);
        } else {
          createState.value.updateCreating();
        }
      }
    }
  },
);

// USER STATE creating + MOUSE EVENT mouseup
onMouseUpHandlers.set(UserActionState.CREATING, (e: MouseEvent) => {
  Debugger.verbose("*emit annotation-create-end", createState.value);
  emit("annotation-create-end", createState.value);
  createState.value.resetCreating();
});

// Annotation UPDATE events

// start_select state + mouse move event => updating
onMouseMoveHandlers.set(
  UserActionState.START_SELECT,
  (e: MouseEvent, payload?: MouseEventPayload) => {
    // is allowed to edit?
    if (!props.allowEdit) {
      return;
    }
    // get current char position
    const position = createPositionFromPoint(e.x, e.y);
    if (!position) {
      return;
    }

    // init update state
    updateState.value.startUpdating(
      userState.value.payload.action,
      userState.value.payload.startOffset + position.offset,
      userState.value.payload.annotation,
      userState.value.payload.annotation.end,
      userState.value.payload.annotation.start,
      userState.value.payload.annotation.end,
      userState.value.payload.annotation.start,
    );

    // confirm update state
    if (hasUpdateBeginListener) {
      Debugger.verbose("*emit annotation-update-begin", updateState.value);
      emit("annotation-update-begin", updateState.value);
    } else {
      updateState.value.confirmStartUpdating();
    }
  },
);

// updating state + mouse move event => keep updating
onMouseMoveHandlers.set(
  UserActionState.UPDATING,
  (e: MouseEvent, payload: MouseEventPayload) => {
    const position = createPositionFromPoint(e.x, e.y);
    let isUpdated: boolean = false;
    if (position) {
      // calculate new annotation position
      const newPosition = payload.startOffset + position.offset;
      const offset = newPosition - updateState.value.handlePosition;
      updateState.value.newStart = updateState.value.annotation.start;
      updateState.value.newEnd = updateState.value.annotation.end;
      switch (updateState.value.action) {
        case "moveEnd":
          if (newPosition >= updateState.value.annotation.start) {
            updateState.value.newEnd = newPosition;
            isUpdated = true;
          }
          break;
        case "moveStart":
          if (newPosition <= updateState.value.annotation.end) {
            updateState.value.newStart = newPosition;
            isUpdated = true;
          }
          break;
        default:
        case "move":
          if (
            updateState.value.newStart !=
            updateState.value.origStart + offset
          ) {
            updateState.value.newStart = updateState.value.origStart + offset;
            updateState.value.newEnd = updateState.value.origEnd + offset;
            isUpdated = true;
          }
          break;
      }
      // postion updated?
      if (isUpdated) {
        // needs confirmation by user?
        if (hasUpdatingListener) {
          Debugger.verbose("*emit annotation-updating", updateState.value);
          emit("annotation-updating", updateState.value);
        } else {
          updateState.value.confirmUpdate();
        }
      }
    }
  },
);

// updating state + mouse up event => end updating
onMouseUpHandlers.set(UserActionState.UPDATING, (e: MouseEvent) => {
  Debugger.verbose("*emit annotation-update-end", updateState.value);
  emit("annotation-update-end", updateState.value);
  updateState.value.resetUpdate();
});

// Annotation HOVER events
onMouseMoveHandlers.set(
  UserActionState.IDLE,
  (e: MouseEvent, payload?: MouseEventPayload) => {
    // over annotation?
    if (payload?.annotation) {
      const annotation: AnnotationInternal = payload.annotation;
      if (
        !hoverState.value.hoveredAnnotations.some((a) => a.id === annotation.id)
      ) {
        hoverState.value.hoveredAnnotations.push(annotation);
        Debugger.verbose("annotation-mouse-over", annotation.id);
        emit("annotation-mouse-over", annotation, e);
      }
    } else {
      hoverState.value.hoveredAnnotations.map(
        (annotation: AnnotationInternal) => {
          Debugger.verbose("annotation-mouse-leave", annotation.id);
          emit("annotation-mouse-leave", annotation, e);
        },
      );
      hoverState.value.hoveredAnnotations = [];
    }
  },
);
</script>
