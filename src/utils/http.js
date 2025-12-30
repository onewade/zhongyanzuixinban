// axios基础的封装
import axios from "axios";

const httpInstance = axios.create({
  baseURL: "/api",
  timeout: 5000
})

// 请求拦截器：可统一添加token等
httpInstance.interceptors.request.use(
  config => {
    // 例如：统一添加token
    // const token = localStorage.getItem('token')
    // if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

// 响应拦截器：统一处理响应和错误
httpInstance.interceptors.response.use(
  response => {
    // 只返回数据部分
    return response.data
  },
  error => {
    // 统一错误提示
    // 可根据实际情况自定义弹窗/提示
    // window.alert(error?.response?.data?.message || '请求失败')
    return Promise.reject(error)
  }
)

export default httpInstance