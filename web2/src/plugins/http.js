//插件模块
import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

    axios.interceptors.request.use(function (config) {
        if (config.url !== 'login') {
            config.headers.common[
                "Authorization"
            ] = localStorage.getItem("token");
        }
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    axios.interceptors.response.use(function (response) {
        return response
    }, function (error) {
        return Promise.reject(error)
    })


    Vue.prototype.$http = axios
}

export default MyHttpServer