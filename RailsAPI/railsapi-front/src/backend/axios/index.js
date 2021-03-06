// import 'axios'
import axios from 'axios'

const API_URL = 'http://localhost:3000'

const secureAxiosInstance = axios.create({
  base_URL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

const plainAxiosInstance = axios.create({
  base_URL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

secureAxiosInstance.interceptors.request.use(config => {
  const method = config.method.toUpperCase()
  if (method !== 'OPTIONS' && method !== 'GET') {
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': localStorage.csrf
    }
  }
  return config
})

secureAxiosInstance.interceptors.response.use(null, error => {
  if (error.response && error.response.config && error.response.status === 401) {
    return plainAxiosInstance.post('refresh', {}, { headers: {
      'X-CSRF-TOKEN': localStorage.csrf
    }}).then(respone => {
      localStorage.csrf = respone.data.csrf
      localStorage.signedIn = true

      let retryConfig = error.respone.config
      retryConfig.headers['X-CSRF-TOKEN'] = localStorage.csrf
      return plainAxiosInstance.request(retryConfig)
    }).catch(error => {
      delete localStorage.csrf
      delete localStorage.signedIn

      location.replace('/')
      return Promise.reject(error)
    })
  } else {
    return Promise.reject(error)
  }
}
)

export { secureAxiosInstance, plainAxiosInstance }
