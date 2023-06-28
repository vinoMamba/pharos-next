import {defineComponent} from "vue";
import {loadingProps} from "./props";
import {Spin} from "ant-design-vue";

export const Loading = defineComponent({
  name: 'Loading',
  props: loadingProps,
  setup(props) {
    return () => (
      <div class="w-full h-full bg-#747b82 opacity-40 top-0 left-0 flex items-center justify-center" style={{
        position: props.absolute ? 'absolute' : 'fixed',
        display: props.loading ? 'flex' : 'none',
      }}>
        <Spin size={props.size} spinning={props.loading} tip={props.tip} />
      </div>
    )
  }
})
