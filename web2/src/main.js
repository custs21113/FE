import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI, { Message, Confirm } from 'element-ui'
import myBread from './components/cuscom/myBread'
import moment from 'moment'

import TreeTable from 'vue-table-with-tree-grid'
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
// Vue.component('my-bread', {
//   template: '',
//   data() {return {}},
//   props:[]
// })
Vue.component(myBread.name, myBread)
Vue.component('tree-table', TreeTable)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
