<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useFormatDate } from '@/composables/useFormatDate'

const { formatDate } = useFormatDate()

const currentDate = ref(new Date())

const updateTime = () => {
  currentDate.value = new Date()
}

let intervalId = null

onMounted(() => {
  updateTime()
  intervalId = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <header class="header position-fixed z-1 w-100">
    <nav class="navbar bg-body-tertiary shadow">
      <div class="container-fluid">
        <div class="d-flex align-items-center w-100">
          <a class="navbar-brand w-25" href="#">
            <img
              src="@/assets/logo.svg"
              alt="Logo"
              width="30"
              height="24"
              class="d-inline-block align-text-top"
            />
            <span class="ps-2 text-uppercase">Inventory</span>
          </a>

          <form class="d-flex w-25" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Поиск"
              aria-label="Search"
            />
            <!-- <button class="btn btn-outline-success d-none" type="submit">Поиск</button> -->
          </form>

          <div class="navbar-text ms-auto">
            <div>Today</div>
            <div class="d-flex">
              <time class="text-uppercase">
                {{ formatDate(currentDate, 'dd, MM yyyy') }}
              </time>
              <div class="text-uppercase">
                <i class="bi bi-clock mx-3" style="color: var(--primary-color)"></i>
                <time>{{ formatDate(currentDate, 'HH:mm') }}</time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header .navbar {
  padding: 0 80px 0 180px;
  height: 80px;
}

.navbar-brand span {
  color: var(--primary-color);
}
</style>
