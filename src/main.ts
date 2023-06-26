import './assets/main.css'
import 'ant-design-vue/dist/antd.css'
import 'virtual:uno.css'
import {createApp} from "vue"
import App from './App.vue'
import {router, setupRouter} from "./router"
import {setupStore} from './store'
import {setupRouterGuard} from './router/guard'

const setupApp = () => {
  const app = createApp(App)

  setupStore(app)

  setupRouter(app)
  setupRouterGuard(router)

  app.mount('#app')
}

setupApp()

