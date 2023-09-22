import { BASE_URL, TIME_OUT } from './config'
import GLRequest from './request'
import { localCache } from "@/utils/catch";
import { LOGIN_TOKEN } from "@/global/constants";

const glRequest = new GLRequest({
  // baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors:{
    requestSuccessFn:(config)=>{
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers&&token) {
        config.headers.Authorization = token
      }

      return config
    }
  }
})

export default glRequest
