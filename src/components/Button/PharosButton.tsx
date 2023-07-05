import {defineComponent} from "vue";
import {Button} from "ant-design-vue";
import {buttonProps} from "./props";

export const PharosButton = defineComponent({
  name: 'PharosButton',
  props: buttonProps,
  inheritAttrs: false,
  setup(props, {slots}) {
    return () => (
      <Button {...props} onClick={props.onClick}>{{
        default: () => slots.default && slots.default(),
      }}</Button>
    )
  }
})
