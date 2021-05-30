// Vue
import Vue from 'vue'
import Vuex from 'vuex'
import pathify from '@/plugins/vuex-pathify'

// Modules
import * as modules from './modules'
import apiServices from '../commons/api.services'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  plugins: [
    pathify.plugin,
  ],
})

apiServices.ApiService.init();

store.subscribe(mutation => {
  console.log(mutation)
 if(!mutation.type.startsWith('user/')) return

  store.dispatch('user/update', mutation)
})

store.dispatch('app/init')

export default store

export const ROOT_DISPATCH = Object.freeze({ root: true })
