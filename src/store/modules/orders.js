import { orders } from '@/data/orders.js'
import { products } from '@/data/products.js'

export const ordersModule = {
  namespaced: true,
  state() {
    return {
      ordersList: orders,
      productsList: products,
      selectedOrderId: null,
      isOrderDetailVisible: false,
    }
  },

  getters: {
    selectedOrder(state) {
      return state.ordersList.find(order => order.id === state.selectedOrderId)
    },

    selectedOrderProducts(state) {
      return state.selectedOrderId ? state.productsList.filter(product => product.order === state.selectedOrderId) : []
    },

    getProductsForOrder: (state) => (orderId) => {
      return state.productsList.filter((product) => product.order === orderId)
    },

    getProductsCountForOrder: (state, getters) => (orderId) => {
      return getters.getProductsForOrder(orderId).length
    },

    getTotalPriceForOrder: (state, getters) => (orderId) => {
      const productsForOrder = getters.getProductsForOrder(orderId)

      return productsForOrder.reduce(
        (totals, product) => {
          product.price.forEach((price) => {
            if (price.symbol === 'USD') {
              totals.USD += price.value
            } else if (price.symbol === 'UAH') {
              totals.UAH += price.value
            }
          })
          return totals
        },
        { USD: 0, UAH: 0 }
      )
    }
  },

  mutations: {
    setOrdersList(state, ordersList) {
      state.ordersList = ordersList
    },
    setSelectedOrderId(state, orderId) {
      state.selectedOrderId = orderId
    },
    setIsOrderDetailVisible(state, visible) {
      state.isOrderDetailVisible = visible
    },
    removeOrder(state, orderId) {
      state.ordersList = state.ordersList.filter(order => order.id !== orderId)
      if (state.selectedOrderId === orderId) {
        state.selectedOrderId = null
        state.isOrderDetailVisible = false
      }
    }
  },

  actions: {
    showOrderDetails({ commit }, orderId) {
      commit('setSelectedOrderId', orderId)
      commit('setIsOrderDetailVisible', true)
    },
    hideOrderDetails({ commit }) {
      commit('setIsOrderDetailVisible', false)
    },
    deleteOrder({ commit }, orderId) {
      commit('removeOrder', orderId)
    },
  }
}
