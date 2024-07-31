import { createRouter, createWebHistory } from 'vue-router'
import OrdersView from '@/views/OrdersView.vue'
import ProductsView from '@/views/ProductsView.vue'

const routes = [
  {
    path: '/orders',
    name: 'Orders',
    component: OrdersView,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductsView,
    meta: { transition: 'slide-right' },
  },
  {
    path: '/',
    redirect: '/orders'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
