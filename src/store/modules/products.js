import { products } from '@/data/products.js'

export const productsModule = {
  namespaced: true,
  state() {
    return {
      productsList: products,
      selectedType: '',
    }
  },

  getters: {
    filteredProducts(state) {
      return state.selectedType
        ? state.productsList.filter((product) => product.type === state.selectedType)
        : state.productsList
    },

    productTypes(state) {
      const types = ['Все типы']
      state.productsList.forEach((product) => {
        if (!types.includes(product.type)) {
          types.push(product.type)
        }
      })
      return types
    },

    getOrderForProduct: (state, getters, rootState) => (productId) => {
      const product = state.productsList.find((product) => product.id === productId)
      return product ? rootState.orders.ordersList.find((order) => order.id === product.order) : null
    },
  },

  mutations: {
    setSelectedType(state, type) {
      state.selectedType = type
    },
  },

  actions: {
    updateSelectedType({ commit }, type) {
      commit('setSelectedType', type)
    },
  }
}
