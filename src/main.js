import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

let data = {
  a: 'apple',
  b: 'orange',
  c: 'carrot'
}

let triggerSomething = function (key, val) {
  //  eslint-disable-next-line
  console.log('triggerSomething()', ' key:', key, ' val:', val)  
  data[key] = val
}

triggerSomething('a', 'tomato')
//  this workd in an android webview . . . basically exposing the function
//  to the global scope
window.triggerSomething = triggerSomething

//  jslint-disable-next-line
let vm = new Vue({
  data,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

// eslint-disable-next-line
console.log('vm', vm)
