<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const login = () => {
  const users = JSON.parse(localStorage.getItem('users')) || []
  const user = users.find(u => u.email === email.value && u.password === password.value)

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user))
    // KHÔNG cần emit nữa, router-view sẽ tự động nhận currentUser mới
    router.push('/')
    // Reload để header cập nhật (có thể dùng better cách như event bus)
    window.location.reload()
  } else {
    alert('Sai thông tin đăng nhập')
  }
}
</script>

<template>
  <div class="card p-4 mx-auto shadow-sm" style="max-width:400px; margin-top: 50px;">
    <h4 class="text-center mb-3">Đăng nhập</h4>
    
    <div class="mb-2">
      <input v-model="email" class="form-control" placeholder="Email">
    </div>
    
    <div class="mb-3">
      <input v-model="password" type="password" class="form-control" placeholder="Mật khẩu">
    </div>
    
    <button class="btn btn-primary w-100" @click="login">Đăng nhập</button>
    
    <div class="text-center mt-3">
      <span>Chưa có tài khoản? </span>
      <router-link to="/register">Đăng ký ngay</router-link>
    </div>
  </div>
</template>