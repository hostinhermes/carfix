// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  items: [
    
    {
      title: 'Clientes',
      icon: 'mdi-account-group',
      to: '/components/customer/',
    },
    {
      title: 'Carros',
      icon: 'mdi-car-multiple',
      to: '/components/car/',
    },
    {
      title: 'Ordens de Serviço',
      icon: 'mdi-tools',
      to: '/components/serviceOrder/',
    },
   
  ],
}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
