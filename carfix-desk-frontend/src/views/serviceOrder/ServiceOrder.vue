<template>
  <v-container
    id="service-order-view"
    fluid
    tag="section"
  >
    <v-row justify="start">
       
      <v-col
        cols="8"
        md="8"
      > 
                 
            <material-card
                icon="mdi-tools"
                icon-small
                title="Ordens de Serviço"
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
                                 @click="addServiceOrder()"
                                >
                                <v-icon left>
                                    mdi-tools
                                </v-icon>
                                Adicionar Ordem de Serviço
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
                                :items="serviceOrders"
                                >

                                <template v-slot:item.actions="{ item }">
                                  <v-icon
                                    small
                                    class="mr-2"
                                    @click="editServiceOrder(item)"
                                  >
                                    mdi-pencil
                                  </v-icon>
                                  <v-icon
                                    small
                                    @click="deleteServiceOrder(item)"
                                  >
                                    mdi-delete
                                  </v-icon>
                               </template>
                               <template v-slot:no-data>
                                  
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
      name: 'ServiceOrderView',
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
          text: 'Cliente',
          value: 'customer.name',
          align: 'right',
        },
        {
          sortable: true,
          text: 'Carro',
          value: 'car.modelName',
        },
        {
          sortable: true,
          text: 'Data Abertura',
          value: 'openDate',
        },
        {
          sortable: true,
          text: 'Status',
          value: 'status',          
        },
        {
          sortable: true,
          text: 'Data Encerramento',
          value: 'closeDate',
          align: 'right',
        }
        ,
        {
          sortable: true,
          text: 'Valor Total',
          value: 'totalValue',
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
           await this.$store.dispatch('serviceOrders/getAll')           
        } catch (error) {
          console.log('Error ', error)
        }
        
    },
      computed: {
      cars: get('serviceOrders/serviceOrders'),
      
    },
    methods : {
      async deleteServiceOrder (serviceOrder) {
        console.log('Deletando item ', serviceOrder)
          try {
                
                await this.$store.dispatch('serviceOrders/deleteServiceOrder', serviceOrder)  
                await this.$store.dispatch('serviceOrders/getAll') 
                Vue.$toast.open({
                    message: 'Ordem de Serviço removida com sucesso!',
                    type: 'success'
                })
            } catch (error) {
                
            }   
      },
      async editServiceOrder (serviceOrder) {
        console.log('Editando OS ', serviceOrder)
        await this.$store.commit('serviceOrders/serviceOrder', serviceOrder)
        await this.$store.commit('serviceOrders/editView', true)
        this.$router.push({path:'/components/serviceOrder/edit', }).catch(failure =>{
          
        })
      },
      async addServiceOrder () {
        console.log('Adicionando OS ')
        await this.$store.commit('serviceOrders/serviceOrder', {})
        await this.$store.commit('serviceOrders/editView', false)
        this.$router.push({path:'/components/serviceOrder/add', }).catch(failure =>{
          
        })
      }
    }
      
  }
</script>
