import {
  createAnnotatedText,
  TextLineAdapter,
} from "@ghentcdh/vue-component-annotated-text";
import { greekText } from "../data";

export const gutters = (id: string) => {
  createAnnotatedText(id, {
    text: TextLineAdapter(),
  })
    .setText(greekText.text)
    .setAnnotations(greekText.annotationsWithGutters);
};
