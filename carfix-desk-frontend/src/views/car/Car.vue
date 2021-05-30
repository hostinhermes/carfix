<template>
  <v-container
    id="car-view"
    fluid
    tag="section"
  >
    <v-row justify="start">
       
      <v-col
        cols="8"
        md="8"
      > 
                 
            <material-card
                icon="mdi-car-side"
                icon-small
                title="Carros"
                color="accent"
                >

               

                <v-container  class="py-0">

                    <v-row>
                          <v-col
                                cols="12"
                                class="text-left"
                            >
                                <v-btn                   
                                color="primary"
                                min-width="150"
                                 @click="addCustomerCar()"
                                >
                                <v-icon left>
                                    mdi-car-2-plus
                                </v-icon>
                                Adicionar Carro
                                </v-btn>
                            </v-col>
                            <v-col  cols="12"
                                class="text-left">
                                <v-card-title>
                                  <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Filtrar"
                                    single-line
                                    hide-details
                                  ></v-text-field>
                              </v-card-title>
                                <v-data-table
                                :search="search"
                                :headers="headers"
                                :items="cars"
                                >

                                <template v-slot:item.actions="{ item }">
                                  <v-icon
                                    small
                                    class="mr-2"
                                    @click="editCustomerCar(item)"
                                  >
                                    mdi-pencil
                                  </v-icon>
                                  <v-icon
                                    small
                                    @click="deleteCustomerCar(item)"
                                  >
                                    mdi-delete
                                  </v-icon>
                               </template>
                               <template v-slot:no-data>
                                  <v-btn
                                    color="primary"
                                    @click="initialize"
                                  >
                                    Reset
                                  </v-btn>
                               </template>

                            </v-data-table>
                            </v-col>

                    </v-row>

                </v-container>

                
               
              
                </material-card>

              
       
      </v-col>

        

     
    </v-row>
  </v-container>
</template>

<script>
 import { get } from 'vuex-pathify'
 import Vue from 'vue'
 
  export default { 
      name: 'CarView',
      data: () => ({
         search: '',
          headers: [
        {
          sortable: true,
          text: 'ID',
          value: 'id',
        },
        {
          sortable: true,
          text: 'Modelo',
          value: 'modelName',
        },
        {
          sortable: true,
          text: 'Marca',
          value: 'brand',
        },
        {
          sortable: true,
          text: 'Ano',
          value: 'year',          
        },
        {
          sortable: true,
          text: 'KM',
          value: 'km',
          align: 'right',
        }
        ,
        {
          sortable: true,
          text: 'Placa',
          value: 'licensePlate',
          align: 'right',
        }
        ,
        {
          sortable: true,
          text: 'Cliente',
          value: 'customer.name',
          align: 'right',
        }
        ,
        {
          sortable: false,
          text: 'Ações',   
          value: 'actions' ,     
          align: 'right',
        }
      ],

      }),
      created: async function () {
        try {
           await this.$store.dispatch('cars/getAll')           
        } catch (error) {
          console.log('Error ', error)
        }
        
    },
      computed: {
      cars: get('cars/cars'),
      
    },
    methods : {
      async deleteCustomerCar (customerCar) {
        console.log('Deletando item ', customerCar)
          try {
                
                await this.$store.dispatch('cars/deleteCustomerCar', customerCar)  
                await this.$store.dispatch('cars/getAll') 
                Vue.$toast.open({
                    message: 'Carro removido com sucesso!',
                    type: 'success'
                })
            } catch (error) {
                
            }   
      },
      async editCustomerCar (customerCar) {
        console.log('Editando carro ', customerCar)
        await this.$store.commit('cars/car', customerCar)
        await this.$store.commit('cars/editView', true)
        this.$router.push({path:'/components/car/edit', }).catch(failure =>{
          
        })
      },
      async addCustomerCar () {
        console.log('Adicionando carro ')
        await this.$store.commit('cars/car', {})
        await this.$store.commit('cars/editView', false)
        this.$router.push({path:'/components/car/add', }).catch(failure =>{
          
        })
      }
    }
      
  }
</script>
