
import Vue from 'vue'
import App from './App'
import store from './vue.stores'
import router from './vue.javascripts/vue.router'


//************************************************ ui库的引用 *******************************************************/

import './vue.javascripts/vue.import.ui'

//************************************************ vue 通用方法 *******************************************************/


import './vue.javascripts/vue.mixins'
import './vue.javascripts/vue.mixins.methdos'
import './vue.javascripts/vue.directives'
import './vue.javascripts/vue.configs'
import './vue.javascripts/vue.prototype'
import './vue.javascripts.tools/tools.doms'
import './vue.javascripts.tools/tools.valids'

import "./vue.csses/icon/iconfont.css";
import "./vue.csses/custom.css"
import "./vue.csses/page.css"
import "./vue.csses/rewrite.css"
import "./vue.csses/view.css"

Vue.config.productionTip = false;
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
