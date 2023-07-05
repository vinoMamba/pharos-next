import {defineComponent} from "vue";
import {Button} from "/@/components/Button";
import {basicProps} from "../props";
import {computed} from "vue";
import {unref} from "vue";

export const ModalFooter = defineComponent({
  name: 'ModalFooter',
  props: basicProps,
  emits: ['ok', 'cancel'],
  setup(props, {emit}) {

    const showCancel = computed(() => props.showCancelBtn)
    const showOk = computed(() => props.showOkBtn)

    const okProps = computed(() => {
      const {okType, confirmLoading, okButtonProps} = props
      return {
        ...okButtonProps,
        type: okType,
        loading: confirmLoading,
        onClick: handleOk
      } as Recordable
    })

    function handleOk(e: Event) {
      emit('ok', e);
    }

    function handleCancel(e: Event) {
      emit('cancel', e);
    }
    return () => (
      <div>
        {unref(showCancel) && <Button onClick={handleCancel}>取消</Button>}
        {unref(showOk) && <Button {...unref(okProps)} >确定</Button>}
      </div >
    )
  }
})
