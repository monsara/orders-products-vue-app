<script setup>
import { useFormatDate } from '@/composables/useFormatDate'

import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, onBeforeRouteLeave } from 'vue-router'

import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min.js'

const store = useStore()
const router = useRouter()
const { formatDate } = useFormatDate()

const ordersList = computed(() => store.state.orders.ordersList)
const selectedOrderId = computed(() => store.state.orders.selectedOrderId)
const isOrderDetailVisible = computed(() => store.state.orders.isOrderDetailVisible)

const selectedOrder = computed(() => store.getters['orders/selectedOrder'])
const selectedOrderProducts = computed(() => store.getters['orders/selectedOrderProducts'])

const getProductsCountForOrder = (orderId) =>
  store.getters['orders/getProductsCountForOrder'](orderId)

const getTotalPriceForOrder = (orderId) => store.getters['orders/getTotalPriceForOrder'](orderId)

const getProductWordEnding = (count) => {
  if (count === 1) return 'продукт'
  if (count > 1 && count < 5) return 'продукта'
  return 'продуктов'
}

const showOrderDetails = (orderId) => {
  store.dispatch('orders/showOrderDetails', orderId)
}

const hideOrderDetails = () => {
  store.dispatch('orders/hideOrderDetails')
}

const deleteOrder = (orderId) => {
  store.dispatch('orders/deleteOrder', orderId)
}

let myModal = null

const openModal = (orderId) => {
  store.commit('orders/setSelectedOrderId', orderId)
  myModal.show()
}

const hideModal = () => {
  myModal.hide()
}

onMounted(() => {
  myModal = new Modal('#confirmDeleteModal', {})

  const sectionContainer = document.querySelector('section')

  // Create an observer to watch for changes in the body
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.classList && node.classList.contains('modal-backdrop')) {
          node.classList.add('position-absolute')
          sectionContainer.appendChild(node)
        }
      })
    })
  })

  // Start observing the body for changes
  observer.observe(document.body, { childList: true })

  // Clean up the observer when the component is unmounted
  return () => {
    observer.disconnect()
  }
})

onBeforeRouteLeave((to, from, next) => {
  if (isOrderDetailVisible.value) {
    hideOrderDetails()
  }
  next()
})
</script>

<template>
  <section>
    <h1 class="d-flex align-items-center fs-3 fw-bold text-secondary mb-5">
      <button
        type="button"
        class="btn btn-add d-flex justify-content-center align-items-center me-2 rounded-circle text-white"
        title="Добавить приход"
      >
        <i class="bi bi-plus"></i>
      </button>
      Приходы / {{ ordersList.length }}
    </h1>

    <div class="d-flex gap-3">
      <transition-group name="fade" tag="ul" class="list-unstyled flex-grow-1">
        <li v-for="order in ordersList" :key="order.id">
          <div class="card mb-3 text-secondary overflow-hidden" @click="showOrderDetails(order.id)">
            <div class="card-body row align-items-center g-5" style="flex-wrap: nowrap">
              <!-- Description -->
              <div class="col-5 flex-shrink-1" v-if="!isOrderDetailVisible">
                {{ order.description }}
              </div>

              <!-- Button with total count products in order -->
              <div class="col-auto d-flex align-items-center">
                <div
                  class="border d-flex justify-content-center align-items-center me-2 rounded-circle text-secondary"
                  style="width: 40px; height: 40px"
                >
                  <i class="bi bi-list-ul"></i>
                </div>

                <div>
                  <div>{{ getProductsCountForOrder(order.id) || 0 }}</div>
                  <div>{{ getProductWordEnding(getProductsCountForOrder(order.id)) }}</div>
                </div>
              </div>

              <!-- Order date -->
              <div class="col-auto">
                <div v-if="order.date">
                  <small class="text-body-tertiary">
                    {{ formatDate(order.date, ' MM / yy') }}
                  </small>
                  <div>
                    {{ formatDate(order.date, 'dd / MMM / yyyy') }}
                  </div>
                </div>
                <div v-else></div>
              </div>

              <!-- Order prices -->
              <div v-if="!isOrderDetailVisible" class="col-2">
                <div>
                  <small class="text-body-tertiary">
                    {{ getTotalPriceForOrder(order.id).USD }}
                    {{ Object.keys(getTotalPriceForOrder(order.id))[0] === 'USD' ? '$' : '' }}
                  </small>
                  <div style="text-wrap: nowrap">
                    {{ getTotalPriceForOrder(order.id).UAH }}
                    {{ Object.keys(getTotalPriceForOrder(order.id))[1] }}
                  </div>
                </div>
              </div>

              <!-- Delete button -->
              <div v-if="!isOrderDetailVisible" class="col-auto ms-auto">
                <button
                  v-if="!isOrderDetailVisible"
                  type="button"
                  class="btn text-secondary"
                  title="Удалить приход"
                  @click.stop="openModal(order.id)"
                >
                  <i class="bi bi-trash3-fill"></i>
                </button>
              </div>
            </div>

            <div
              v-if="selectedOrderId === order.id && isOrderDetailVisible"
              class="right-pointer d-flex align-items-center justify-content-center rounded-0 position-absolute end-0 top-0 bottom-0"
            >
              <i class="bi bi-chevron-right"></i>
            </div>
          </div>
        </li>
      </transition-group>

      <!-- Order details -->
      <div
        v-if="isOrderDetailVisible"
        class="card mb-3 text-secondary w-50 flex-shink-0 align-self-start"
        style="flex-grow: 2"
      >
        <div class="bg-white card-header pb-0 pe-5 ps-4 py-4">
          <h5 class="card-title">{{ selectedOrder.description }}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">
            <button type="button" class="btn btn-add px-0">
              <i class="bi bi-plus-circle-fill pe-1"></i>
              Добавить продукт
            </button>

            <button
              type="button"
              class="btn rounded-circle border-0 bg-light shadow position-absolute"
              style="top: -20px; right: -20px; width: 40px; height: 40px"
              title="Добавить продукт"
              @click="hideOrderDetails"
            >
              <i class="bi bi-x"></i>
            </button>
          </h6>
        </div>

        <ul class="list-group list-group-flush">
          <li
            v-for="product in selectedOrderProducts"
            :key="product.id"
            class="list-group-item px-4"
          >
            <div class="row align-items-center gap-3">
              <div class="col-auto">
                <i
                  class="bi bi-circle-fill"
                  :style="{
                    color: product.isNew === 1 ? 'var(--tertiary-color)' : 'var(--bs-secondary-rgb)'
                  }"
                ></i>
              </div>

              <div class="col-auto">
                <img class="" alt="Product image" src="../assets/monitor.png" style="width: 50px" />
              </div>

              <div class="col-4">
                <div class="">{{ product.title }}</div>
                <small class="text-body-tertiary">{{ product.type }}</small>
              </div>

              <div class="col-auto" style="color: var(--tertiary-color)">
                <div>
                  {{ product.isNew === 1 ? 'Свободен' : '' }}
                </div>
              </div>

              <div class="col-auto ms-auto">
                <button type="button" class="btn text-secondary" title="Удалить продукт">
                  <i class="bi bi-trash3-fill"></i>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade position-absolute"
      id="confirmDeleteModal"
      tabindex="-1"
      aria-labelledby="confirmDeleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" style="margin-top: 190px">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="confirmDeleteModalLabel">
              Вы уверены, что хотите удалить этот приход?
            </h1>
            <button
              type="button"
              class="bg-white btn-close opacity-100 position-absolute rounded-5 shadow"
              data-bs-dismiss="modal"
              aria-label="Close"
              style="top: -10px; right: -10px; width: 20px; height: 20px"
            ></button>
          </div>
          <div class="modal-body">
            {{ ordersList[selectedOrderId - 1]?.description }}
          </div>
          <div class="modal-footer py-3">
            <button type="button" class="btn text-white text-uppercase fw-bold" @click="hideModal">
              Отменить
            </button>
            <button
              type="button"
              class="btn text-danger bg-white text-uppercase rounded-5 fw-bold px-4 shadow"
              data-bs-dismiss="modal"
              @click="deleteOrder(selectedOrderId)"
            >
              <i class="bi bi-trash3-fill"></i>
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  border-radius: 0.25rem;
}

.right-pointer {
  background-color: rgb(208, 216, 219);
  width: 40px;
}

.right-pointer i {
  color: white;
}

.btn-add:hover {
  opacity: 0.9;
}

h1 .btn-add {
  width: 30px;
  height: 30px;
  border: 3px solid var(--secondary-color) !important;
  background-color: var(--primary-color) !important;
}

.card .btn-add {
  color: var(--primary-color) !important;
}

.modal-footer {
  background-color: var(--primary-color);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
