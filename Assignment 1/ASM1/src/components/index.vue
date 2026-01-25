<template>
  <div class="bg-light min-vh-100" style="font-family: 'Segoe UI', sans-serif;">
    
    <nav class="navbar navbar-expand-lg sticky-top shadow-sm border-bottom" style="background-color: #e3f2fd;">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img src="../assets/images/Logo-phim.png" alt="Logo" width="130">
        </a>
        
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" v-for="item in menuItems" :key="item.path">
              <router-link class="nav-link px-3" :class="{ 'active fw-bold text-primary': item.active }" :to="item.path">
                <i :class="[item.icon, 'text-primary me-1']"></i>{{ item.text }}
              </router-link>
            </li>
          </ul>

          <div class="d-flex align-items-center">
            <template v-if="!isLoggedIn">
              <router-link to="/dang-ky " class="btn btn-white bg-white border rounded-pill px-4 me-2 shadow-sm">Đăng ký</router-link>
              <router-link to="/dang-nhap" class="btn btn-primary rounded-pill px-4 shadow-sm">Đăng nhập</router-link>
            </template>
            
            <div v-else class="dropdown">
              <button class="btn btn-outline-primary dropdown-toggle rounded-pill px-4 shadow-sm fw-bold" data-bs-toggle="dropdown">
                <i class="fa-solid fa-user-circle me-1"></i> Chào, {{ isLoggedIn }}
              </button>
              <ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2 rounded-3">
                <li><router-link class="dropdown-item py-2" to="/gioi-thieu"><i class="fa-solid fa-id-card me-2 text-primary"></i>Cá nhân</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger py-2" href="#" @click="logout"><i class="fa-solid fa-power-off me-2"></i>Đăng xuất</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="container mt-5">
       </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoggedIn = ref(null);
const movies = ref([]);

// SỬA 4: Cập nhật path thành các đường dẫn router (không dùng .html)
const menuItems = ref([
  { text: 'Trang chủ', path: '/', icon: 'fa-solid fa-house', active: true },
  { text: 'Đăng phim', path: '/dang-phim', icon: 'fa-solid fa-cloud-arrow-up', active: false },
  { text: 'Bình luận', path: '/binh-luan', icon: 'fa-solid fa-comments', active: false },
  { text: 'Giới thiệu', path: '/gioi-thieu', icon: 'fa-solid fa-address-card', active: false },
  { text: 'Danh sách', path: '/danh-sach', icon: 'fa-solid fa-list', active: false },
]);

// ... Giữ nguyên các hàm onMounted, logout, deleteMovie, v.v.
</script>