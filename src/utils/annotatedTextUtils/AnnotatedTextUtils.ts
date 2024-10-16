import { computed } from "vue";
import { annotationStyle } from "./AnnotatedTextUtils/annotation.style";
import { componentClasses } from "./AnnotatedTextUtils/component.classes";
import { wordPartClasses } from "./AnnotatedTextUtils/wordPart.classes";
import { annotationGutterClasses } from "./AnnotatedTextUtils/annotationGutter.classes";
import { annotationGutterStyle } from "./AnnotatedTextUtils/annotationGutter.style";
import { annotationClasses } from "./AnnotatedTextUtils/annotation.classes";
import type { UpdateAnnotationState } from "../../state";
import type { Annotation } from "../../types/Annotation";
import type {
  AnnotatedLine,
  AnnotationStyle,
  RenderType,
  WordPart,
} from "../../types/AnnotatedText";

export type CssClassUtilProps = {
  theme?: string;
  /**
   * @deprecated
   */
  render?: RenderType;
  /**
   * Object to define classes for styles.
   */
  style?: AnnotationStyle;
  /**
   * Whether to show the labels
   */
  showLabels?: boolean;
  /**
   * List of annotation ID's that are selected. Those will get the "active" style class
   */
  selectedAnnotations?: string[];
  /**
   * List of annotation ID's that are hovered. Those will get the "hovered" style class.
   */
  hoveredAnnotations?: string[];
};

export class CssClassesUtil<P extends CssClassUtilProps> {
  props: P;
  editAnnotationState: UpdateAnnotationState;

  constructor(props: P, editingAnnotation: UpdateAnnotationState) {
    this.props = props;
    this.editAnnotationState = editingAnnotation;
  }

  componentClasses = computed((): any[] => {
    const { theme, render, showLabels } = this.props;
    const { action } = this.editAnnotationState;
    return componentClasses(theme, render, showLabels, action);
  });

  wordPartClasses = (wordPart: WordPart): string[] => {
    return wordPartClasses(wordPart.annotations);
  };

  annotationGutterClasses = (
    annotation: Annotation,
    line: AnnotatedLine
  ): string[] => {
    const { style } = this.props;
    return annotationGutterClasses(annotation, style, line);
  };

  annotationStyle(annotation: Annotation): string[] {
    return annotationStyle(annotation.color);
  }

  annotationGutterStyle(annotation: Annotation): string[] {
    return annotationGutterStyle(annotation.color);
  }

  annotationClasses = (
    annotation: Annotation,
    start: number,
    end: number,
    allowCreate: boolean
  ): string[] => {
    const { style, selectedAnnotations, hoveredAnnotations } = this.props;

    return annotationClasses(
      annotation,
      this.editAnnotationState.annotation,
      style,
      start,
      end,
      allowCreate,
      selectedAnnotations,
      hoveredAnnotations
    );
  };
}
