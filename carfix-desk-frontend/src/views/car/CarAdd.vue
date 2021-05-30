<template>
  <v-container
    id="caradd-view"
    fluid
    tag="section"
  >
    <v-row justify="start">
       
      <v-col
        cols="8"
        md="8"
      > 
           <material-card
            color="primary"
            icon="mdi-car-settings"
            >
         
             <template #title v-if="editView">
                Alterar Carro
            </template>
            <template #title v-else>
                Novo Carro
            </template>

            <v-form @submit.prevent="saveCustomerCar(car)">
                <v-container class="py-0">
                <v-row>
                   
                    <v-col
                    cols="12"
                    md="6"
                    >
                    <v-text-field
                        v-model="car.modelName"
                        color="purple"
                        label="Modelo"
                    />
                    </v-col>

                    <v-col
                    cols="12"
                    md="6"
                    >
                    <v-text-field
                        v-model="car.brand"
                        color="purple"
                        label="Marca"
                    />
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                            v-model="car.year"
                            color="purple"
                            label="Ano"
                        />
                    </v-col>

                    <v-col
                    cols="12"
                    md="3"
                    >
                    <v-text-field
                        v-model="car.km"
                        color="purple"
                        label="Km"
                    />
                    </v-col>

                    <v-col
                    cols="12"
                    md="3"
                    >
                    <v-text-field
                        v-model="car.licensePlate"
                        color="purple"
                        label="Placa"
                    />
                    </v-col>

                   

                    <v-col
                    cols="12"
                    md="4"
                    >
                    <v-select
                        v-model="car.customer"                      
                        :items="customers"
                        item-text="name"
                        item-value="id"
                        label="Cliente"
                        return-object
                        single-line
                    ></v-select>                   
                    </v-col>

                    <v-col 
                    cols="10"
                    class="text-right"> 
                         <v-btn
                            color="secondary"
                            min-width="150"
                            to="/components/car"
                        >
                            Cancelar
                        </v-btn>                    
                    </v-col>

                    <v-col
                    cols="2"
                    class="text-left"
                    >
                   
                    <v-btn
                    
                        type="submit"
                        color="primary"
                        min-width="150"
                    >
                        Salvar
                    </v-btn>
                    </v-col>
                </v-row>
                </v-container>
            </v-form>
            </material-card>
       
      </v-col>

        

     
    </v-row>
  </v-container>
</template>

<script>
import { call, get } from 'vuex-pathify'
import { mapActions } from 'vuex'
import Vue from 'vue'

  export default { 
      name: 'CarAddView',
       data: () => ({       
       
    }),
    methods: {
      
        async saveCustomerCar(car) {   
            try {
                
                await this.$store.dispatch('cars/saveCustomerCar', car)  
                this.$router.go(-1); 
                let action = 'cadastrado'
                if (this.editView) {
                    action = 'alterado'
                }
                Vue.$toast.open({
                    message: `Carro ${action} com sucesso!`,
                    type: 'success'
                })
            } catch (error) {
                
            }                 
               
        }
    },
    computed: {  
        car: get('cars/car'),         
        editView: get('cars/editView'),
        customers: get('customers/customers'),      
    },
    created: async function () {
        try {
           await this.$store.dispatch('customers/getAll')           
        } catch (error) {
          console.log('Error ', error)
        }
        
    },
    
      
  } 
</script>
