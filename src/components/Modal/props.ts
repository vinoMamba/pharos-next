import type {PropType} from "vue";
import type {ModalWrapperProps} from "./type";
import type {CSSProperties} from "vue";
import type {ButtonProps} from "ant-design-vue";

export const modalProps = {
  visible: {type: Boolean, default: false},
  scrollTop: {type: Boolean, default: true},
  height: {type: Number},
  minHeight: {type: Number},
  draggable: {type: Boolean, default: false},
  centered: {type: Boolean, default: false},
  cancelText: {type: String, default: '取消'},
  okText: {type: String, default: '确定'},
  closeFunc: {type: Function as PropType<() => Promise<boolean>>},
}

export const basicProps = Object.assign({}, modalProps, {
  defaultFullscreen: {type: Boolean},
  // Can it be full screen
  canFullscreen: {type: Boolean, default: true},
  // After enabling the wrapper, the bottom can be increased in height
  wrapperFooterOffset: {type: Number, default: 0},
  // Warm reminder message
  helpMessage: [String, Array] as PropType<string | string[]>,
  // Whether to setting wrapper
  useWrapper: {type: Boolean, default: true},
  loading: {type: Boolean},
  loadingTip: {type: String},
  /**
   * @description: Show close button
   */
  showCancelBtn: {type: Boolean, default: true},
  /**
   * @description: Show confirmation button
   */
  showOkBtn: {type: Boolean, default: true},

  wrapperProps: Object as PropType<Partial<ModalWrapperProps>>,

  afterClose: Function as PropType<() => Promise<VueNode>>,

  bodyStyle: Object as PropType<CSSProperties>,

  closable: {type: Boolean, default: true},

  closeIcon: Object as PropType<VueNode>,

  confirmLoading: {type: Boolean},

  destroyOnClose: {type: Boolean},

  footer: Object as PropType<VueNode>,

  getContainer: Function as PropType<() => any>,

  mask: {type: Boolean, default: true},

  maskClosable: {type: Boolean, default: true},
  keyboard: {type: Boolean, default: true},

  maskStyle: Object as PropType<CSSProperties>,

  okType: {type: String, default: 'primary'},

  okButtonProps: Object as PropType<ButtonProps>,

  cancelButtonProps: Object as PropType<ButtonProps>,

  title: {type: String},

  visible: {type: Boolean},

  width: [String, Number] as PropType<string | number>,

  wrapClassName: {type: String},

  zIndex: {type: Number},
});
