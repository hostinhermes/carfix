// Imports
import Vue from 'vue'
import Router from 'vue-router'
import { trailingSlash } from '@/util/helpers'
import {
  layout,
  route,
} from '@/util/routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    layout('Default', [
      //route('Dashboard'),

      // Pages
      //route('UserProfile', null, 'components/profile'),
      route('Clientes', { default: 'customer/Customer' }, 'components/customer'),
      route('Clientes/Adicionar', { default: 'customer/CustomerAdd' }, 'components/customer/add'),
      route('Clientes/Editar', { default: 'customer/CustomerAdd' }, 'components/customer/edit'),

      route('Carros', { default: 'car/Car' }, 'components/car'),
      route('Carros/Adicionar', { default: 'car/CarAdd' }, 'components/car/add'),
      route('Carros/Editar', { default: 'car/CarAdd' }, 'components/car/edit'),

      route('Ordens de Serviço', { default: 'serviceOrder/ServiceOrder' }, 'components/serviceOrder'),
      route('Carros/Adicionar', { default: 'serviceOrder/ServiceOrderAdd' }, 'components/serviceOrder/add'),
      route('Carros/Editar', { default: 'serviceOrder/ServiceOrderAdd' }, 'components/serviceOrder/edit'),

      // Components
      //route('Notifications', null, 'components/notifications'),
      //route('Icons', null, 'components/icons'),
      //route('Typography', null, 'components/typography'),

      // Tables
      //route('Regular Tables', null, 'tables/regular'),

      // Maps
      //route('Google Maps', null, 'maps/google'),
    ]),
  ],
})

router.beforeEach((to, from, next) => {
  return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
})

export default router
