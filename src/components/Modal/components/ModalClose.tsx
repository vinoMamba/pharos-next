import {defineComponent} from "vue";
import {FullscreenExitOutlined, FullscreenOutlined, CloseOutlined} from '@ant-design/icons-vue';
import {Tooltip} from "ant-design-vue";

export const ModalClose = defineComponent({
  name: 'ModalClose',
  props: {
    canFullscreen: {type: Boolean, default: true},
    fullScreen: {type: Boolean},
  },
  emits: ['cancel', 'fullscreen'],
  setup(props, {emit}) {
    function handleClose(e: Event) {
      emit('cancel', e);
    }

    function handleFullScreen(e: Event) {
      e?.stopPropagation();
      e?.preventDefault();
      emit('fullscreen');
    }

    function renderFullScreen() {
      if (props.fullScreen) {
        return <Tooltip title="重置" placement="bottom"><FullscreenExitOutlined /></Tooltip>
      } else {
        return <Tooltip title="全屏" placement="bottom"><FullscreenOutlined role="close" onClick={handleFullScreen} /></Tooltip>
      }
    }

    return () => (
      <>
        {
          props.canFullscreen && renderFullScreen()
        }
        <Tooltip title="关闭" placement="bottom"><CloseOutlined role="close" onClick={handleClose} /></Tooltip>
      </>
    )
  }
})
