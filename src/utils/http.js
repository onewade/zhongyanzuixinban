// axios基础的封装
import axios from "axios";

const httpInstance = axios.create({
  baseURL:window.httpurl,
  timeout:5000
  //http://139.9.154.151:8082/api/SchoolMealOrder
  //http://192.168.21.33:6088/WebHomeAPI/Web_BackgroundPic
})
// axios请求拦截器
// httpInstance.interceptors.request.use(config => {
//   return config
// }, e => Promise.reject(e))

// axios响应式拦截器
// httpInstance.interceptors.response.use(res => res.data, e => {
//   return Promise.reject(e)
// })

export default httpInstance