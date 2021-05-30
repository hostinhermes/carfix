<template>
  <v-container
    id="customer-view"
    fluid
    tag="section"
  >
    <v-row justify="start">
       
      <v-col
        cols="8"
        md="8"
      > 
                 
            <material-card
                icon="mdi-account-group-outline"
                icon-small
                title="Clientes"
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
                                 @click="addCustomer()"
                                >
                                <v-icon left>
                                    mdi-account-plus
                                </v-icon>
                                Adicionar Cliente
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
                                :items="customers"
                                >

                                <template v-slot:item.actions="{ item }">
                                  <v-icon
                                    small
                                    class="mr-2"
                                    @click="editCustomer(item)"
                                  >
                                    mdi-pencil
                                  </v-icon>
                                  <v-icon
                                    small
                                    @click="deleteCustomer(item)"
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
 import { call, get } from 'vuex-pathify'
 import Vue from 'vue'
 
  export default { 
      name: 'CustomerView',
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
          text: 'Nome',
          value: 'name',
        },
        {
          sortable: true,
          text: 'Email',
          value: 'email',          
        },
        {
          sortable: true,
          text: 'Telefone',
          value: 'phone',
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
           await this.$store.dispatch('customers/getAll')           
        } catch (error) {
          console.log('Error ', error)
        }
        
    },
      computed: {
      customers: get('customers/customers'),
      
    },
    methods : {
      async deleteCustomer (customer) {
        console.log('Deletando item ', customer)
          try {
                
                await this.$store.dispatch('customers/deleteCustomer', customer)  
                await this.$store.dispatch('customers/getAll') 
                Vue.$toast.open({
                    message: 'Cliente removido com sucesso!',
                    type: 'success'
                })
            } catch (error) {
                
            }   
      },
      async editCustomer (customer) {
        console.log('Editando cliente ', customer)
        await this.$store.commit('customers/customer', customer)
        await this.$store.commit('customers/editView', true)
        this.$router.push({path:'/components/customer/edit', }).catch(failure =>{
          
        })
      },
      async addCustomer () {
        console.log('Adicionando cliente ')
        await this.$store.commit('customers/customer', {})
        await this.$store.commit('customers/editView', false)
        this.$router.push({path:'/components/customer/add', }).catch(failure =>{
          
        })
      }
    }
      
  }
</script>
