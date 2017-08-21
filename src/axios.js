import axios from 'axios'

/* axios */
axios.defaults.baseURL = 'https://192.168.1.234:8443/salt/salt2rice/'
// dev api
// axios.defaults.baseURL = '/salt/salt2rice/'
const defaultParams = {
  pageIndex: 1,
  pageSize: 10,
  userID: 'a681438615584b7cabc0ec28813b3741'
}
axios.userID = 'a681438615584b7cabc0ec28813b3741'
axios.userName = '游客3050873'
axios.userPhoto = '../static/img/default_avatar.png'
axios.userGrade = '1'

axios.interceptors.request.use(config => {
  // console.log('---------- http request ----------', config.url)
  if (config.method === 'get') {
    if (!config.params) {
      config.params = defaultParams
    } else {
      config.params.pageIndex || (config.params.pageIndex = defaultParams.pageIndex)
      config.params.pageSize || (config.params.pageSize = defaultParams.pageSize)
      config.params.userID || (config.params.userID = defaultParams.userID)
      if (config.params.userID === 'all') {
        config.params.userID = ''
      }
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
