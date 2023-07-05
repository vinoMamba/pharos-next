import type {PropType} from "vue";

export const buttonProps = {
  block: {
    type: Boolean,
    default: false
  },
  danger: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'large' | 'middle' | 'default'>,
    default: 'default'
  },
  type: {
    type: String as PropType<'primary' | 'dashed' | 'text' | 'link' | 'default'>,
    default: 'default'
  },
}
