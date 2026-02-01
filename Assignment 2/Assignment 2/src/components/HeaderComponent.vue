<script setup>
import logo from '../assets/images/logo 2.png'

defineProps({
  user: Object
})

const emit = defineEmits([
  'go-home',
  'go-list',
  'go-login',
  'go-register',
  'go-add',
  'go-profile',
  'logout'
])
</script>

<template>
  <nav class="navbar shadow-sm border-bottom bg-light">
    <div class="container d-flex justify-content-center align-items-center gap-3">

      <!-- Logo -->
      <button class="btn p-0" @click="$emit('go-home')">
        <img :src="logo" width="120" />
      </button>

      <!-- Menu -->
      <button class="btn nav-link" @click="$emit('go-home')">Trang chủ</button>
      <button class="btn nav-link" @click="$emit('go-list')">Danh sách</button>

      <!-- Khi đã đăng nhập -->
      <template v-if="user">
        <button class="btn nav-link" @click="$emit('go-add')">Đăng truyện</button>
        <button class="btn nav-link" @click="$emit('go-profile')">Cá nhân</button>
        <span class="fw-bold text-primary">{{ user.email }}</span>
        <button class="btn btn-danger btn-sm" @click="$emit('logout')">Đăng xuất</button>
      </template>

      <!-- Khi chưa đăng nhập -->
      <template v-else>
        <button class="btn btn-outline-primary" @click="$emit('go-register')">Đăng ký</button>
        <button class="btn btn-primary" @click="$emit('go-login')">Đăng nhập</button>
      </template>

    </div>
  </nav>
</template>
