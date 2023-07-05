import {defineComponent} from "vue";
import {Modal} from "ant-design-vue";
import {basicProps} from "../props";
import {extendSlots} from "/@/utils/helper/tsxHelper";
import {useAttrs} from "vue";
import {unref} from "vue";
import {useModalDragMove} from "../hooks/useModalDrag";
import {toRefs} from "vue";

export const BasicModal = defineComponent({
  name: 'BasicModal',
  props: basicProps,
  emits: ['cancel'],
  setup(props, {emit, slots}) {
    const {visible, draggable, destroyOnClose} = toRefs(props);
    const attrs = useAttrs();
    useModalDragMove({
      visible,
      destroyOnClose,
      draggable,
    });

    const onCancel = (e: Event) => {
      emit('cancel', e)
    }
    return () => {
      const propsData = {...props, ...unref(attrs), onCancel} as Recordable;
      return (
        <Modal {...propsData}>{extendSlots(slots)}</Modal>
      )
    }
  }
})
