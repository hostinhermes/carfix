// Pathify
import { commit, make } from 'vuex-pathify'
import apiServices from '../../commons/api.services';


const state = {
  customers: [{}],
  customer: {
    id: 0,
    name: '',
    birthdate: null,
    address: '',
    district: '',
    city: '',
    phone: '',
    email: '',
    document: '',
  },
  editView: false
}

const CUSTOMER_API_SUFFIX = 'customers';

const mutations = make.mutations(state)

const actions = {
    getAll: async () => {
       console.log('Buscando dados')
       try {
        const result = await apiServices.ApiService.query(CUSTOMER_API_SUFFIX); 
        console.log('Resultado :', result.data)        
        commit('customers/customers', result.data)
       } catch (error) {
           console.log('Error 2', error)
       }
       
  },
 
  saveCustomer: async (context, data, bool) => {   
    if(data.id > 0){
      const result = await apiServices.ApiService.put(CUSTOMER_API_SUFFIX, data); 
      console.log(result)
    } else {
      const result = await apiServices.ApiService.post(CUSTOMER_API_SUFFIX, data); 
      console.log(result)
    }
    
  },

  deleteCustomer: async (context, data, bool) => {
    const result = await apiServices.ApiService.delete(CUSTOMER_API_SUFFIX, data.id); 
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
