<template>
  <v-container
    id="customer-add-view"
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
            icon="mdi-account-outline"
            >
         
             <template #title v-if="editView">
                Alterar Cliente
            </template>
            <template #title v-else>
                Novo Cliente
            </template>

            <v-form @submit.prevent="saveCustomer(customer)">
                <v-container class="py-0">
                <v-row>
                   
                    <v-col
                    cols="12"
                    md="6"
                    >
                    <v-text-field
                        v-model="customer.name"
                        color="purple"
                        label="Nome"
                    />
                    </v-col>

                    <v-col
                    cols="12"
                    md="6"
                    >
                    <v-text-field
                        v-model="customer.email"
                        color="purple"
                        label="Email"
                    />
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                            v-model="customer.address"
                            color="purple"
                            label="Endereço"
                        />
                    </v-col>

                    <v-col
                    cols="12"
                    md="3"
                    >
                    <v-text-field
                        v-model="customer.district"
                        color="purple"
                        label="Bairro"
                    />
                    </v-col>

                    <v-col
                    cols="12"
                    md="3"
                    >
                    <v-text-field
                        v-model="customer.city"
                        color="purple"
                        label="Cidade"
                    />
                    </v-col>

                   

                    <v-col
                    cols="12"
                    md="4"
                    >
                    <v-text-field
                        v-model="customer.phone"
                        color="purple"
                        label="Telefone"
                    />
                    </v-col>

                    <v-col
                    cols="12"
                    md="4"
                    >
                        <template>
                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    
                                    :value="formatDate"
                                    label="Nascimento"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                v-model="customer.birthdate"
                                ref="picker"                               
                                :max="new Date().toISOString().substr(0, 10)"
                                min="1950-01-01"
                                @change="save"
                                ></v-date-picker>
                            </v-menu>
                        </template>
                    </v-col> 

                     <v-col
                    cols="12"
                    md="4"
                    >
                    <v-text-field
                        v-model="customer.document"
                        color="purple"
                        label="Documento"
                    />
                    </v-col>                

                    <v-col 
                    cols="10"
                    class="text-right"> 
                         <v-btn
                            color="secondary"
                            min-width="150"
                            to="/components/customer"
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
      name: 'CustomerAddView',
       data: () => ({       
        menu: false,
       
    }),
    watch: {
        menu (val) {
            val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        },
    },
    methods: {
       save (date) {
            this.$refs.menu.save(date)
        },
        async saveCustomer(customer) {   
            try {
                
                await this.$store.dispatch('customers/saveCustomer', customer)  
                this.$router.go(-1); 
                let action = 'cadastrado'
                if (this.editView) {
                    action = 'alterado'
                }
                Vue.$toast.open({
                    message: `Cliente ${action} com sucesso!`,
                    type: 'success'
                })
            } catch (error) {
                
            }                 
               
        }
    },
    computed: {
        customer: get('customers/customer'),
         formatDate () {
             console.log(this.customer.birthdate)
            if (!this.customer.birthdate) return null

            const [year, month, day] = this.customer.birthdate.split('-')
            return `${day}/${month}/${year}`
        },
        editView: get('customers/editView')
        
    }
      
  } 
</script>
