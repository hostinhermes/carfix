import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    console.log(process.env);
    Vue.axios.defaults.baseURL = 'http://localhost:3000';
    console.log('process.env.VUE_APP_API_BASE_URL ', process.env.VUE_APP_API_BASE_URL);
    Vue.axios.interceptors.response.use((response) => {
      if (response.status === 200 || response.status === 201) {
        return Promise.resolve(response);
      }
      return Promise.reject(response);
    },
    (error) => {
      const responseStatus = error.response.status;
      if (responseStatus && responseStatus === 500) {
        if (!error.response.data.message) {
          error.response.data.message = 'Falha na comunicação com o servidor';
        }
      }
      if (error.response.data.responseData) {
        if (error.response.data.responseData.details.base) {
          error.response.data.message = `<center><strong>${error.response.data.message}</strong> <br> ${error.response.data.responseData.details.base[0].description}</center>`;
        }
        if (error.response.data.responseData.details.field_options) {
          error.response.data.message = `<center><strong>${error.response.data.message}</strong> <br> ${error.response.data.responseData.details.field_options[0].description}</center>`;
        }
      }
      // Vue.$toast.error(error.response.data.message);
      return Promise.reject();
    });
  },

  query(resource, params) {
    return Vue.axios.get(resource, params);
  },

  get(resource, id) {
    return Vue.axios.get(`${resource}/${id}`);
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource, id) {
    return Vue.axios.delete(`${resource}/${id}`);
  },

};

export default { 
  ApiService 
} ;
