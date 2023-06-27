import {defineComponent} from "vue";
import {useAppStore} from "/@/store/modules/app";
import {onMounted} from "vue";

export const AppProvider = defineComponent({
  name: 'AppProvider',
  setup(_, {slots}) {
    const appStore = useAppStore()
    onMounted(() => {
      appStore.setProjectConfig({})
    })
    return () => slots.default?.()
  }
})
