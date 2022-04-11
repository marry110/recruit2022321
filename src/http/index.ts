import axios from 'axios'

enum MESSAGE {
  '请求成功' = 200,
  '密码错误' = 201,
  '账号错误' = 202,
  '请求异常' = 999,
}

const $http = axios.create({
  // 通过操作接口域名

  baseURL: process.env.VUE_APP_BASE_URL,
  // baseURL: '/mock',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=uft-8',
  },
})
$http.interceptors.request.use((config) => {
  config.headers = config.headers || {}
  // config.headers.token=

  return config
})

$http.interceptors.response.use(
  (res) => {
    const code: number = res.data?.code
    // if (code != 200) {
    //   alert(MESSAGE[code])
    //   return Promise.reject(res.data)
    // } else {
    return res.data
    // }
  },
  (err) => {
    console.log(err)
  }
)

export default $http
