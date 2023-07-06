import {type PropType, defineComponent} from "vue";
import {Title} from "../../Title";
import {computed} from "vue";
import {unref} from "vue";

export const ModalHeader = defineComponent({
  name: 'ModalHeader',
  props: {
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
    },
    title: {type: String},
  },
  setup(props) {
    const text = computed(() => props.title)
    const helpMsg = computed(() => props.helpMessage)

    return () => (
      <Title helpMessage={unref(helpMsg)}>{unref(text)}</Title>
    )
  }
})
