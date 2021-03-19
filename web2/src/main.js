import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI, { Message, Confirm } from 'element-ui'
import moment from 'moment'
//传统axios使用方式
// import axios from 'axios'
// Vue.prototype.$http = axios

//插件方式引用axios
import MyHttpServer from './plugins/http'

import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css'

Vue.config.productionTip = false
Vue.use(ElementUI).use(MyHttpServer)
Vue.$message = Message
Vue.$confirm = Confirm
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
