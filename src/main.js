import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import 'fullpage.js/vendors/scrolloverflow'
import VueFullPage from 'vue-fullpage.js'
Vue.use(VueFullPage)
import App from './App'
import store from './store'
import router from './router'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)
// import ECharts from 'vue-echarts'
// Vue.component('chart', ECharts)
import Moment from 'moment'
Vue.filter('convertTime', function(data, formatStr) {
  return Moment(data).format(formatStr)
})
import vuescroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'
Vue.use(vuescroll)
import Axios from 'axios'
Vue.prototype.$ajax = Axios

import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
