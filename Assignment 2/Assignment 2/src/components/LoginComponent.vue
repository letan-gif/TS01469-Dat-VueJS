<script setup>
import { ref } from 'vue'
const emit = defineEmits(['login-success', 'go-register'])

const email = ref('')
const password = ref('')

const login = () => {
  const users = JSON.parse(localStorage.getItem('users')) || []
  const user = users.find(u => u.email === email.value && u.password === password.value)

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user))
    emit('login-success')
  } else {
    alert('Sai thông tin đăng nhập')
  }
}
</script>

<template>
  <div class="card p-4 mx-auto" style="max-width:400px">
    <h4 class="text-center mb-3">Đăng nhập</h4>
    <input v-model="email" class="form-control mb-2" placeholder="Email">
    <input v-model="password" type="password" class="form-control mb-3" placeholder="Mật khẩu">
    <button class="btn btn-primary w-100" @click="login">Đăng nhập</button>
    <button class="btn btn-link mt-2" @click="$emit('go-register')">Chưa có tài khoản?</button>
  </div>
</template>
