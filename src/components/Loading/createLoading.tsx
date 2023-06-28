import {createVNode} from "vue";
import {defineComponent} from "vue";
import {reactive} from "vue";
import {render} from "vue";
import type {LoadingProps} from "./props";
import {Loading} from "./Loading";

export function createLoaidng(props: LoadingProps, target?: HTMLElement) {

  const loadingProps = reactive({
    ...props
  })

  const Wrap = defineComponent({
    setup() {
      return () => (<Loading {...loadingProps} />)
    }
  })

  const vm = createVNode(Wrap)
  render(vm, document.createElement('div'));

  function open(target: HTMLElement = window.document.body) {
    const el = vm.el as HTMLElement;
    target.appendChild(el);
  }

  function close() {
    const el = vm.el as HTMLElement;
    const parent = el.parentNode;
    if (parent) {
      parent.removeChild(el);
    }
  }

  if (target) {
    open(target);
  }

  return {
    vm,
    open,
    close,
    setLoading(loading: boolean) {
      loadingProps.loading = loading;
    }
  }
}
