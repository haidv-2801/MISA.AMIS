import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/employee',
    name: 'Setting',
    component: () => import('../components/views/employee/EmployeeIndex.vue')
  },
  {
    path: '/employee',
    name: 'Report',
    component: () => import('../components/views/employee/EmployeeIndex.vue')
  },
  {
    path: '/employee',
    name: 'Overview',
    component: () => import('../components/views/employee/EmployeeIndex.vue')
  },
  {
    path: '/',
    name: 'Employee',
    component: () => import('../components/views/employee/EmployeeIndex.vue')
  },
  {
    path: '/employee',
    name: 'Product',
    component: () => import('../components/views/employee/EmployeeIndex.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
