import axios from 'axios'

/* axios */
axios.defaults.baseURL = window.baseUrl || 'https://192.168.1.234:8443/salt/salt2rice/'
// dev api
// axios.defaults.baseURL = '/salt/salt2rice/'
const userID = window.userID || 'a681438615584b7cabc0ec28813b3741'
const defaultParams = {
  pageIndex: 1,
  pageSize: 10,
  userID: userID
}

/* default user info */
axios.userID = userID
axios.userName = window.userName
axios.userPhoto = window.userPhoto
axios.userGrade = window.userGrade

axios.interceptors.request.use(config => {
  // console.log('---------- http request ----------', config.url)
  if (config.ignoreBaseUrl) {
    config.url = config.url.replace(config.baseURL, '')
  }
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

/* getting current userInfo */
// axios.get('/userInfo/getUserInfo')
//   .then((res) => {
//     if (res.resultCode === 200) {
//       const resObj = res.object
//       axios.userID = userID
//       axios.userName = resObj.showName
//       axios.userPhoto = resObj.photo
//       axios.userGrade = resObj.accountBalance && resObj.accountBalance.grade
//       console.log('------ current userInfo ------')
//       console.log(axios.userName)
//       console.log(axios.userPhoto)
//       console.log(axios.userGrade)
//       console.log('------ current userInfo end ------')
//     }
//   })
//   .catch((err) => {
//     console.log('getting userInfo failed', err)
//   })

export default axios
