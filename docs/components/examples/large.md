# Large dataset

<div id="annotated-text--large"></div>

<script setup>
//
import { largeText } from "@demo";

import { onMounted } from "vue";
import { clearAnnotatedTextCache} from "@ghentcdh/vue-component-annotated-text";

onMounted(()=> {
    clearAnnotatedTextCache();
    largeText('annotated-text--large')
});
</script>
