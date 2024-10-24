---
Right to left
---

# Right to left

:::warning
Visualisation is correct but selection is flacky
:::

For arabic text, the text should be displayed from right to left. This is a feature that is not yet implemented in the
current version of the component.
Put the `right-to-left` attribute to `true` to display the text from right to left.




<script setup>
  import {
    AnnotatedText,
    Debugger,
    UserActionState,
  } from "../../../src";
  import { lines } from "../../demo/line";
  import { annotations } from "../../demo/annotations";

</script>

```vue

<AnnotatedText
  :annotations="annotations"
  :lines="textLines"
  :right-to-left="true"
/>

```

<ClientOnly>
    <AnnotatedText
    :annotations="annotations"
    :lines="lines"
    :right-to-left="true"
    :allow-edit="true"
    :allow-create="true"
    />
</ClientOnly>