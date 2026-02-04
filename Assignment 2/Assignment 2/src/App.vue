<template>
  <div id="app">
    <!-- Header với các RouterLink -->
    <nav class="navbar shadow-sm border-bottom bg-light">
      <div class="container d-flex justify-content-center align-items-center gap-3">
        
        <!-- Logo -->
        <RouterLink to="/" class="btn p-0">
          <img src="./assets/images/logo 2.png" width="120" alt="Logo" />
        </RouterLink>

        <!-- Menu chung -->
        <RouterLink to="/" class="btn nav-link"><i class="fa-solid fa-house"></i> Trang chủ</RouterLink>
        <RouterLink to="/chapters" class="btn nav-link"><i class="fa-solid fa-file"></i> Danh sách chương</RouterLink>
        <RouterLink to="/comments" class="btn nav-link"><i class="fa-solid fa-comment"></i> Bình luận</RouterLink>

        <!-- Khi đã đăng nhập -->
        <template v-if="currentUser">
          <RouterLink to="/add-story" class="btn nav-link"><i class="fa-solid fa-upload"></i> Đăng truyện</RouterLink>
          <RouterLink to="/profile" class="btn nav-link"><i class="fa-solid fa-circle-user"></i> Cá nhân</RouterLink>

          <span class="fw-bold text-primary">{{ currentUser.email }}</span>
          <button class="btn btn-danger btn-sm" @click="logout">
           Đăng xuất
          </button>
        </template>

        <!-- Khi chưa đăng nhập -->
        <template v-else>
          <RouterLink to="/register" class="btn btn-outline-primary btn-sm">
            <i class="fa-solid fa-address-card"></i> Đăng ký
          </RouterLink>
          <RouterLink to="/login" class="btn btn-primary btn-sm">
            <i class="fa-solid fa-arrow-right-to-bracket"></i> Đăng nhập
          </RouterLink>
        </template>

      </div>
    </nav>

    <!-- Main content với RouterView -->
    <main class="container mt-4">
      <RouterView :user="currentUser" @login-success="handleLoginSuccess" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

// Khởi tạo currentUser từ localStorage khi app khởi động
const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')) || null)

// Xử lý khi đăng nhập thành công
const handleLoginSuccess = () => {
  currentUser.value = JSON.parse(localStorage.getItem('currentUser'))
}

// Xử lý đăng xuất
const logout = () => {
  localStorage.removeItem('currentUser')
  currentUser.value = null
  // Tự động reload để cập nhật header
  window.location.reload()
}

// Theo dõi sự thay đổi của currentUser trong localStorage
onMounted(() => {
  currentUser.value = JSON.parse(localStorage.getItem('currentUser')) || null
})
</script>

<style scoped>
.nav-link {
  font-weight: 500;
}

.nav-link.router-link-active {
  color: #0d6efd !important;
  background-color: rgba(13, 110, 253, 0.1);
  border-radius: 5px;
}

.navbar {
  padding: 0.75rem 0;
}

#app {
  min-height: 100vh;
}
</style>