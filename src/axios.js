import axios from 'axios'

/* axios */
// axios.defaults.baseURL = 'https://192.168.1.234:8443/salt/salt2rice/'
// axios.defaults.baseURL = 'https://192.168.1.233:8080/'
axios.interceptors.request.use(config => {
  // console.log('---------- http request ----------', config.url)
  return config
}, err => {
  return Promise.reject(err)
})
axios.interceptors.response.use(res => {
  console.log('---------- http request success ----------', res)
  return Promise.resolve(res.data)
}, err => {
  console.log('---------- http request failed ----------', err)
  return Promise.reject(err)
})

export default axios
