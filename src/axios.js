import axios from 'axios'

/* axios */
axios.defaults.baseURL = 'https://192.168.1.234:8443/salt/salt2rice/'
// dev api
// axios.defaults.baseURL = '/salt/salt2rice/'
const defaultParams = {
  pageIndex: 1,
  pageSize: 5
}

axios.interceptors.request.use(config => {
  // console.log('---------- http request ----------', config.url)
  if (config.method === 'get') {
    if (!config.params) {
      config.params = defaultParams
    } else {
      config.params.pageIndex || (config.params.pageIndex = defaultParams.pageIndex)
      config.params.pageSize || (config.params.pageSize = defaultParams.pageSize)
    }
  }
  return config
}, err => {
  return Promise.reject(err)
})
axios.interceptors.response.use(res => {
  // console.log('---------- http request success ----------', res)
  return Promise.resolve(res.data)
}, err => {
  // console.log('---------- http request failed ----------', err)
  return Promise.reject(err)
})

export default axios
