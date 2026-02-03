<script setup>
import { ref, onMounted } from 'vue'

// Lấy thông tin user từ localStorage khi component được load
const user = ref(JSON.parse(localStorage.getItem('currentUser')))

onMounted(() => {
  // Đảm bảo dữ liệu mới nhất nếu có thay đổi
  user.value = JSON.parse(localStorage.getItem('currentUser'))
})
</script>

<template>
  <div v-if="user" class="card p-4 mx-auto mt-5 shadow-sm" style="max-width:450px">
    <h4 class="mb-4 text-center">👤 Thông tin cá nhân</h4>

    <div class="mb-3">
      <label class="form-label fw-bold">Email tài khoản</label>
      <input class="form-control bg-light" :value="user.email" disabled>
    </div>

    <div class="mb-4">
      <label class="form-label fw-bold">Mật khẩu</label>
      <input class="form-control bg-light" type="password" value="********" disabled>
    </div>
    
    <button class="btn btn-outline-secondary w-100" @click="$router.push('/')">
      Quay lại trang chủ
    </button>
  </div>
  
  <div v-else class="text-center mt-5">
    <p>Vui lòng đăng nhập để xem thông tin cá nhân.</p>
    <router-link to="/login" class="btn btn-primary">Đăng nhập</router-link>
  </div>
</template>

<style scoped>
.card {
  border-radius: 12px;
}
</style>