import { Annotation, AnnotationTarget } from "./Annotation";

export enum AnnotationGranularity {
  Char = "char",
  SingleToken = "single_token",
  MultipleTokens = "multiple_tokens",
  Sentence = "sentence",
}

export interface AnnotationStyle {
  activeClass: string;
  startClass: string;
  endClass: string;
  weightClass: string;
  transitioningClass: string;
}

export interface AnnotationActionPayload {
  action: ActionType;
  annotation?: Annotation;
  handlePosition?: number;
}

export type ActionType = "moveStart" | "moveEnd" | "move";

export interface AnnotationActionState extends AnnotationActionPayload {
  origStart?: number;
  origEnd?: number;
  newStart?: number;
  newEnd?: number;
}

export interface CreateAnnotationState {
  start?: number;
  end?: number;
  target?: AnnotationTarget; //TODO fix this after gutter annotation display and edit works
}

export type RenderType = "nested" | "flat";

export interface Paragraph {
  lines: Line[];
  start?: number;
  end?: number;
  gutter?: string;
}

export interface Line {
  text: string;
  start: number;
  end: number;
  gutter?: string;
}

export interface Text {
  paragraphs: Paragraph[];
}

interface WordPart {
  start: number;
  end: number;
  text: string;
  annotations: Annotation[];
}

interface Word {
  start: number;
  end: number;
  text: string;
}

interface AnnotatedWord {
  start: number;
  end: number;
  text: string;
  parts: WordPart[];
}

interface AnnotatedLine {
  start: number;
  end: number;
  parts?: WordPart[];
  words?: AnnotatedWord[];
  gutter?: {
    text: string;
    annotations: Annotation[];
  };
}

type RangeWithAnnotation = [number, number, Annotation | null];
type RangeWithAnnotations = [number, number, Annotation[]];
