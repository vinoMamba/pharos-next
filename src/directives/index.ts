import type {App} from 'vue';
import {setupLoadingDirective} from './loading';

export const setupGlobDirectives = (app: App) => {
  setupLoadingDirective(app);
}
