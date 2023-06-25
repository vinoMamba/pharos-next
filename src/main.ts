import './assets/main.css'
import 'ant-design-vue/dist/antd.css'
import 'virtual:uno.css'
import {createApp} from "vue"
import App from './App.vue'

const setupApp = () => {
  const app = createApp(App)
  app.mount('#app')
}

setupApp()

