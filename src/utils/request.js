import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// import { add } from '@/api/table'
import qs from 'qs'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const { method } = config
    if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT') {
      // debugger
      if (config.contentType === 'x-www-form-urlencoded') {
        config.data = qs.stringify(config.data)
      }
    }
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation

      config.headers['X-Access-Token'] = getToken()
      // config.headers['application/x-www-form-urlencoded'] = add()
    }
    service.defaults.timeout = 30000
    // 请求头信息是为post请求设置
    service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code && res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    const { status } = error.response.data
    if (status === 500) {
      MessageBox.confirm('登录状态已过期，请点击重新登录或点击取消停留在当前页面', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
      return Promise.reject(error)
    }
    console.log('err' + error) // for debug
    if (process.env.NODE_ENV === 'development') {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
