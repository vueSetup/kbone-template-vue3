import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

createApp(App).use(router).mount("#app")

const bootstrap = () => {
  const container = document.createElement("div")
  container.id = "app"
  document.body.appendChild(container)

  return createApp(App).use(router).mount("#app")
}

export default bootstrap
