<template>
  <!-- slot: annotation-before -->
  <span
    v-if="start === annotation?.start"
    class="annotation-slot annotation-slot--before"
  >
    <slot name="annotation-before" :annotation="annotation" />
  </span>
  <!-- output annotation -->
  <span
    v-if="annotations.length"
    :class="annotationClassHandler(annotation, start, end, allowCreate)"
    :style="annotationStyle(annotation.color)"
    @mousedown.stop="click($event, wordPartStart, 'move')"
    @mousemove.stop="mouseMove($event, wordPartStart)"
    @dblclick="dblClick($event, wordPartStart)"
  >
    <!-- handle: move annotation start -->
    <span
      v-if="canHandle && start === annotation?.start"
      class="handle handle--start"
      @mousedown.stop="click($event, wordPartStart, 'moveStart')"
    ></span>
    <!-- recurse annotation list -->
    <RecursiveAnnotatedTokenPartText
      :annotations="annotations.slice(1)"
      :text="text"
      :start="start"
      :end="end"
      :allow-edit="allowEdit"
      :word-part-start="wordPartStart"
      :annotation-class-handler="annotationClassHandler"
      @annotation-click="onClick"
      @annotation-double-click="onDoubleClick"
      @annotation-mouse-move="onMove"
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
    </RecursiveAnnotatedTokenPartText>
    <!-- annotation label -->
    <label v-if="annotations[0].label">{{ annotations[0].label }}</label>
    <!-- handle: move annotation end -->
    <span
      v-if="canHandle && end === annotations[0]?.end"
      class="handle handle--end"
      @mousedown.stop="click($event, wordPartStart, 'moveEnd')"
    ></span>
  </span>
  <span v-else class="text">{{ text }}</span>
  <!-- slot: annotation-after -->
  <span
    v-if="end === annotation?.end"
    class="annotation-slot annotation-slot--after"
  >
    <slot name="annotation-after" :annotation="annotation" />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import RecursiveAnnotatedTokenPartText from "./RecursiveAnnotatedTokenPartText.vue";
import type { ActionType } from "../types/AnnotatedText";
import { annotationStyle } from "../utils/annotatedTextUtils/AnnotatedTextUtils/annotation.style";
import type {
  RecursiveAnnotatedTokenPartTextEmits,
  RecursiveAnnotatedTokenPartTextProps,
} from "@/types/props";

const props = withDefaults(
  defineProps<RecursiveAnnotatedTokenPartTextProps>(),
  {
    annotations: () => [],
    annotationClassHandler: () => [],
  },
);

const annotation = computed(() => props.annotations[0]);

const canHandle = computed(() => props.allowEdit || props.allowCreate);

const emit = defineEmits<RecursiveAnnotatedTokenPartTextEmits>();

const click = (
  event: MouseEvent,
  wordPartStart: number,
  action?: ActionType,
) => {
  onClick(event, {
    startOffset: wordPartStart,
    annotation: annotation.value,
    action,
  });
};

const dblClick = (
  event: MouseEvent,
  wordPartStart: number,
  action?: ActionType,
) => {
  onDoubleClick(event, {
    startOffset: wordPartStart,
    annotation: annotation.value,
    action,
  });
};

const mouseMove = (event: MouseEvent, wordPartStart: number) => {
  onMove(event, {
    startOffset: wordPartStart,
    annotation: annotation.value,
  });
};

const onClick = (event: MouseEvent, payload: any) => {
  emit("annotation-click", event, payload);
};
const onDoubleClick = (event: MouseEvent, payload: any) => {
  emit("annotation-double-click", event, payload);
};
const onMove = (event: MouseEvent, payload: any) => {
  emit("annotation-mouse-move", event, payload);
};
</script>

<style scoped lang="scss"></style>
