import 'virtual:uno.css';
import '/@/design/index.less';
import 'ant-design-vue/dist/antd.css';
import {createApp} from "vue"
import App from './App.vue'
import {router, setupRouter} from "./router"
import {setupStore} from './store'
import {setupRouterGuard} from './router/guard'
import {setupGlobDirectives} from './directives';

const setupApp = () => {
  const app = createApp(App)

  setupStore(app)

  setupRouter(app)
  setupRouterGuard(router)

  setupGlobDirectives(app)
  app.mount('#app')
}

setupApp()

