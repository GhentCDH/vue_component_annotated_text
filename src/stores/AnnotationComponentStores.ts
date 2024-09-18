import {
  CreateAnnotationState,
  UpdateAnnotationState,
  HoverAnnotationsState,
  UserState,
} from "@/lib/annotatedTextUtils/StateClasses";
import { ref } from "vue";

export const useStateObjectsStore = () => {
  const userState = ref(new UserState());
  const updateState = ref(new UpdateAnnotationState(userState.value));
  const createState = ref(new CreateAnnotationState(userState.value));
  const hoverState = ref(new HoverAnnotationsState());

  return { updateState, createState, hoverState, userState };
}
