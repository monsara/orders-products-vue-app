<script setup>
import { useFormatDate } from '@/composables/useFormatDate'

import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const { formatDate } = useFormatDate()

const productsList = computed(() => store.state.products.productsList)
const selectedType = computed({
  get: () => store.state.products.selectedType,
  set: (value) => store.dispatch('products/updateSelectedType', value)
})
const filteredProducts = computed(() => store.getters['products/filteredProducts'])
const productTypes = computed(() => store.getters['products/productTypes'])

const getOrderForProduct = (productId) => store.getters['products/getOrderForProduct'](productId)
</script>

<template>
  <section>
    <div class="d-flex align-items-center mb-5 gap-5">
      <h1 class="d-flex align-items-center fs-3 fw-bold text-secondary mb-0">
        Продукты / {{ productsList.length }}
      </h1>

      <div class="d-flex align-items-center gap-3">
        <label for="typeSelect" class="form-label mb-0">Тип:</label>
        <select
          id="typeSelect"
          class="form-select"
          aria-label="Default select example"
          style="width: 300px"
          v-model="selectedType"
        >
          <option v-for="type in productTypes" :key="type" :value="type === 'Все типы' ? '' : type">
            {{ type }}
          </option>
        </select>
      </div>

      <div class="d-flex align-items-center gap-3">
        <label for="specSelect" class="form-label mb-0">Тип:</label>
        <select
          id="specSelect"
          class="form-select"
          aria-label="Default select example"
          style="width: 300px"
        >
          <option selected>Все спецификации</option>
          <option value="1">Specification 1</option>
        </select>
      </div>
    </div>

    <ul class="list-unstyled list-unstyled overflow-auto">
      <li v-for="product in filteredProducts" :key="product.id">
        <div class="card mb-3 text-secondary" style="width: max-content">
          <div class="card-body row align-items-center g-5" style="flex-wrap: nowrap">
            <div class="col-auto">
              <i
                class="bi bi-circle-fill ps-4"
                :class="{
                  'text-success': product.isNew === 1,
                  'text-secondary': product.isNew !== 1
                }"
              ></i>
            </div>

            <div class="col-auto">
              <img class="" alt="Product image" src="../assets/monitor.png" style="width: 50px" />
            </div>

            <div class="col-auto" style="width: 120px">
              {{ product.title }}
            </div>

            <div class="col-auto" style="width: 120px">
              {{ product.type }}
            </div>

            <div class="col-auto">
              <small class="text-body-tertiary">
                {{ formatDate(product.guarantee.start, 'dd / MMM') }}
              </small>
              <div>{{ formatDate(product.guarantee.end, 'dd / MMM / yyyy') }}</div>
            </div>

            <div class="col-auto">
              <small class="text-body-tertiary">
                {{ formatDate(product.guarantee.start, 'dd / MMM ') }}
              </small>
              <div>{{ formatDate(product.guarantee.end, 'dd / MMM / yyyy') }}</div>
            </div>

            <div class="col-auto">
              <small class="text-body-tertiary">
                {{ product.price[0].value }}
                {{ product.price[0].isDefault === 0 ? '$' : '' }}
              </small>
              <div>{{ product.price[1].value }} {{ product.price[1].symbol }}</div>
            </div>

            <div class="col-auto" style="width: 500px">
              {{ getOrderForProduct(product.id)?.description }}
            </div>

            <div class="col-auto ms-auto">
              <button type="button" class="btn text-secondary" title="Удалить приход">
                <i class="bi bi-trash3-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
