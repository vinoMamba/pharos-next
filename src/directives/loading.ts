import type {App, Directive} from 'vue';
import {createLoaidng} from '/@/components/Loading';

export const loadingDirective: Directive = {
  mounted(el, binding) {
    const fullScreen = binding.modifiers.full;
    const vm = createLoaidng({
      loading: binding.value,
      tip: el.getAttribute('loading-tip') || '加载中...',
      absolute: !fullScreen
    }, fullScreen ? window.document.body : el);
    el.instance = vm;
  },
  updated(el, binding) {
    const instance = el.instance;
    if (!instance) return;
    if (binding.value !== binding.oldValue) {
      instance.setLoading(binding.value);
    }
  },
  unmounted(el) {
    const instance = el.instance;
    if (!instance) return;
    instance.close();
  }
}

export function setupLoadingDirective(app: App) {
  app.directive('loading', loadingDirective);
}
