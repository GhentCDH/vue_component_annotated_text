import { Annotation } from "@/types/Annotation";
import {
  AnnotatedLine,
  AnnotationActionPayload,
  AnnotationStyle,
  Line,
  RenderType,
  WordPart
} from "@/types/AnnotatedText";

export interface AnnotatedTextProps {
  text?: string;
  annotations?: Annotation[];
  lines: Line[];
  annotationOffset?: number;
  debug?: boolean;
  theme?: string;
  render?: RenderType;
  showLabels?: boolean;
  autoAnnotationWeights?: boolean;
  style?: AnnotationStyle;
  allowEdit?: boolean;
}

export interface RecursiveAnnotatedTokenPartTextProps {
  text: string;
  start: number;
  end: number;
  annotations?: Annotation[];
  annotationClassHandler?: (annotation: Annotation, start: number, end: number) => string[];
  annotationClickHandler: (annotation: Annotation) => void;
  annotationActionHandler: (mouseEvent: MouseEvent, payload: AnnotationActionPayload) => void;
}

export interface AnnotatedLineProps {
  line: AnnotatedLine,
  wordPartClasses?: (wordPart: WordPart) => any[];
  render?: RenderType;
  annotationClasses?: (annotation: Annotation, start: number, end: number) => string[];
  onMouseEnterLinePartHandler: (wordPart: WordPart, mouseEvent: MouseEvent) => void;
  onClickAnnotation: (annotation: Annotation) => void;
  onAnnotationStartHandler: (mouseEvent: MouseEvent, payload: AnnotationActionPayload) => void;
}
