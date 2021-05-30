// Pathify
import { commit, make } from 'vuex-pathify'
import apiServices from '../../commons/api.services';


const state = {
  cars: [{}],
  car: {
    id: 0,
    modelName: '',
    brand: '',
    year: '',
    km: '',
    licensePlate: '',
    customer: null,   
  },
  editView: false
}

const CUSTOMER_CAR_API_SUFFIX = 'cars';

const mutations = make.mutations(state)

const actions = {
    getAll: async () => {
       console.log('Buscando dados')
       try {
        const result = await apiServices.ApiService.query(CUSTOMER_CAR_API_SUFFIX); 
        console.log('Resultado :', result.data)        
        commit('cars/cars', result.data)
       } catch (error) {
           console.log('Error 2', error)
       }
       
  },
 
  saveCustomerCar: async (context, data, bool) => {   
    if(data.id > 0){
      const result = await apiServices.ApiService.put(CUSTOMER_CAR_API_SUFFIX, data); 
      console.log(result)
    } else {
      const result = await apiServices.ApiService.post(CUSTOMER_CAR_API_SUFFIX, data); 
      console.log(result)
    }
    
  },

  deleteCustomerCar: async (context, data, bool) => {
    const result = await apiServices.ApiService.delete(CUSTOMER_CAR_API_SUFFIX, data.id); 
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
