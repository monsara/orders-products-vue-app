import { createStore } from 'vuex'
import { ordersModule } from './modules/orders'
import { productsModule } from './modules/products'

const store = createStore({
  modules: {
    orders: ordersModule,
    products: productsModule
  }
})

export default store