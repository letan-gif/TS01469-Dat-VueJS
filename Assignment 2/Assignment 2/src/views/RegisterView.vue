<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const register = () => {
  if (!email.value || !password.value) {
    alert('Vui lòng nhập đầy đủ thông tin')
    return
  }

  const users = JSON.parse(localStorage.getItem('users')) || []
  
  // Kiểm tra email đã tồn tại chưa
  if (users.find(u => u.email === email.value)) {
    alert('Email này đã được đăng ký')
    return
  }

  users.push({ 
    email: email.value, 
    password: password.value 
  })
  
  localStorage.setItem('users', JSON.stringify(users))
  alert('Đăng ký thành công!')
  
  // Chuyển sang trang đăng nhập
  router.push('/login')
}
</script>

<template>
  <div class="card p-4 mx-auto shadow-sm" style="max-width:400px; margin-top: 50px;">
    <h4 class="text-center mb-3">Đăng ký</h4>
    
    <div class="mb-2">
      <input v-model="email" class="form-control" placeholder="Email">
    </div>
    
    <div class="mb-3">
      <input v-model="password" type="password" class="form-control" placeholder="Mật khẩu">
    </div>
    
    <button class="btn btn-success w-100" @click="register">Đăng ký</button>
    
    <div class="text-center mt-3">
      <router-link to="/login" class="btn btn-link">Đã có tài khoản? Đăng nhập</router-link>
    </div>
  </div>
</template>