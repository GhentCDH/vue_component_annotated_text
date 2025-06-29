# Getting started

In a web application, first you need to create a container for the AnnotatedText component. This container will be used
to render the component and its annotations.

## Quick start

```html

<div :id="id"></div>
```

Once the container is created and available in the DOM, you can create an instance of the AnnotatedText component.
The config can be set to an empty object, as the component will use the default [configuration](config/index).

```ts
import { createAnnotatedText } from "@ghentcdh/vue-component-annotated-text";

const id = `annotated-text-{uuid}`;

const textAnnotation = createAnnotatedText(id)
  .setLines(lines)
  .setAnnotations(annotations);
``` 

Don't forget to replace do destroy the component when it is no longer needed to avoid memory leaks.

```ts
  textAnnotation.destroy();
```

## Example

<div id="annotated-text">ann</div>

<script setup>
//
import { onMounted, onUnmounted, watch, watchEffect } from "vue";
import { createAnnotatedText } from "@ghentcdh/vue-component-annotated-text";
import { lines, annotations, waitUntilElementExists } from "@demo";
const id = `annotated-text`;

waitUntilElementExists(id).then((element) => {
    createAnnotatedText(id)
    .setLines(lines)
    .setAnnotations(annotations);
});

</script>

