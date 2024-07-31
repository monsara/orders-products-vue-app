<script setup></script>

<template>
  <aside class="sidebar-navigation text-center bg-light shadow-lg p-3" style="width: 220px">
    <div
      class="rounded-circle position-relative d-inline-block mt-4 mb-4 bg-secondary"
      style="width: 100px; height: 100px"
    >
      <img
        src="../assets/user-placeholder.jpeg"
        class="rounded-circle img-fluid object-fit-cover w-100 h-100"
        alt="User Photo"
      />
      <button
        type="button"
        class="btn btn-light rounded-circle shadow position-absolute text-secondary"
        style="bottom: -5px; right: -5px; width: 40px; height: 40px"
      >
        <i class="bi bi-gear-fill"></i>
      </button>
    </div>

    <ul class="nav flex-column text-uppercase">
      <li class="nav-item mb-3">
        <RouterLink to="/orders" class="nav-link text-secondary fw-bold" active-class="active-link">
          Приход
        </RouterLink>
      </li>
      <li class="nav-item mb-3">
        <a href="" class="nav-link text-secondary fw-bold">Группы</a>
      </li>
      <li class="nav-item mb-3">
        <RouterLink
          to="/products"
          class="nav-link text-secondary fw-bold"
          active-class="active-link"
        >
          Продукты
        </RouterLink>
      </li>
      <li class="nav-item mb-3">
        <a href="" class="nav-link text-secondary fw-bold">Пользователи</a>
      </li>
      <li class="nav-item">
        <a href="" class="nav-link text-secondary fw-bold">Настройки</a>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.nav-link {
  position: relative;
  display: inline-block;
  padding-bottom: 4px;
  transition: color 0.25s ease-in-out;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 3px;
  bottom: 0;
  left: 50%;
  background-color: var(--secondary-color);
  transition:
    width 0.25s ease-in-out,
    left 0.25s ease-in-out;
}

.nav-link:hover::after,
.nav-link.active-link::after {
  width: 100%;
  left: 0;
}
</style>
