import * as Vue from 'vue'
import App from './App.vue'
import router from './router'
import { isMiniprogram } from '@/shared/context'
// import 'vant/lib/index.css';
import './styles.less'

if (!isMiniprogram) {
  document.body.dataset.weuiTheme = 'light'
  document.documentElement.style.backgroundColor = 'var(--weui-BG-0)'
  Vue.createApp(App).use(router).mount('#app')
} else {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.getComputedStyle = window.$$getComputedStyle
}

export default function createApp() {
  const app = document.createElement('div')
  app.id = 'app'
  app.classList.add('app')
  document.body.appendChild(app)

  return Vue.createApp(App).use(router).mount('#app')
}
