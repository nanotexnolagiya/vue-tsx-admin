import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App'
// import './main.css'

Vue.config.productionTip = false;

const AppInstance = new Vue({
  store,
  router,
  render(h: any){
    return h(App)
  }
})

AppInstance.$mount('#app')
