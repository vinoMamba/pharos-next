import {defineComponent} from "vue";
import {Help} from "../Help";
import {computed} from "vue";
import {unref} from "vue";

export const PharosTitle = defineComponent({
  name: 'PharosTitle ',
  props: {
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
  },
  setup(props, {slots}) {
    const helpMsg = computed(() => props.helpMessage)
    return () => (
      <span>
        {slots.default?.()}
        {unref(helpMsg) && <Help text={unref(helpMsg)} />}
      </span>
    )
  }
})
