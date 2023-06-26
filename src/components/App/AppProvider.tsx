import {defineComponent} from "vue";

export const AppProvider = defineComponent({
  name: 'AppProvider',
  setup(_, {slots}) {
    return () => slots.default?.()
  }
})
