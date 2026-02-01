<script setup>
import { ref } from 'vue'
const emit = defineEmits(['register-success'])

const email = ref('')
const password = ref('')

const register = () => {
  const users = JSON.parse(localStorage.getItem('users')) || []
  users.push({ email: email.value, password: password.value })
  localStorage.setItem('users', JSON.stringify(users))
  alert('Đăng ký thành công')
  emit('register-success')
}
</script>

<template>
  <div class="card p-4 mx-auto" style="max-width:400px">
    <h4 class="text-center mb-3">Đăng ký</h4>
    <input v-model="email" class="form-control mb-2" placeholder="Email">
    <input v-model="password" type="password" class="form-control mb-3" placeholder="Mật khẩu">
    <button class="btn btn-success w-100" @click="register">Đăng ký</button>
  </div>
</template>
