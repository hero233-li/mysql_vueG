import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from '@/store/Login/login'
const pinia = createPinia()
function registerStore(app: App<Element>) {
  app.use(pinia)
  //刷新界面的时候加载本地数据
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}
export default registerStore
