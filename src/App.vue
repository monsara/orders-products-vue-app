<script setup>
import { RouterLink, RouterView } from 'vue-router'

import TopMenu from './components/TopMenu.vue'
import NavigationMenu from './components/NavigationMenu.vue'
import Orders from './components/Orders.vue'
import Products from './components/Products.vue'
</script>

<template>
  <TopMenu />

  <main class="container-fluid d-flex h-100 px-0 bg-body-tertiary" style="padding-top: 80px">
    <NavigationMenu />

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
