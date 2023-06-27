import type {App, Directive} from 'vue';

export const loadingDirective: Directive = {
  mounted(el, binding) {
    console.log(el);
    console.log(binding);
  }
}

export function setupLoadingDirective(app: App) {
  app.directive('loading', loadingDirective);
}
