// Pathify
import { commit, make } from 'vuex-pathify'
import apiServices from '../../commons/api.services';


const state = {
  serviceOrders: [{}],
  serviceOrder: {
    id: 0,
    customer: null,
    car: null,
    openDate: '',
    closeDate: '',
    totalValue: '',
    status: '',   
  },
  editView: false
}

const CUSTOMER_SO_API_SUFFIX = 'serviceOrder';

const mutations = make.mutations(state)

const actions = {
    getAll: async () => {
       console.log('Buscando dados')
       try {
        const result = await apiServices.ApiService.query(CUSTOMER_SO_API_SUFFIX); 
        console.log('Resultado :', result.data)        
        commit('serviceOrders/serviceOrders', result.data)
       } catch (error) {
           console.log('Error 2', error)
       }
       
  },
 
  saveServiceOrder: async (context, data, bool) => {   
    if(data.id > 0){
      const result = await apiServices.ApiService.put(CUSTOMER_SO_API_SUFFIX, data); 
      console.log(result)
    } else {
      const result = await apiServices.ApiService.post(CUSTOMER_SO_API_SUFFIX, data); 
      console.log(result)
    }
    
  },

  deleteServiceOrder: async (context, data, bool) => {
    const result = await apiServices.ApiService.delete(CUSTOMER_SO_API_SUFFIX, data.id); 
    console.log(result)
  }
  
}

const getters = {
    ...make.getters(state)
    
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
