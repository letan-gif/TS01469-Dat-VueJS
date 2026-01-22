<template>
  <div class="bg-light min-vh-100">
    <nav class="navbar navbar-expand-lg sticky-top shadow-sm border-bottom" style="background-color: #e3f2fd;">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img src="/Assignment 1/ASM1/src/assets/images/Logo-phim.png" alt="Logo" width="130">
        </a>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link px-3" href="/"><i class="fa-solid fa-house me-1"></i>Trang chủ</a></li>
            <li class="nav-item"><a class="nav-link px-3" href="/danh-sach"><i class="fa-solid fa-bookmark me-1"></i>Danh sách</a></li>
          </ul>

          <div class="d-flex align-items-center">
            <div v-if="user" class="dropdown">
              <button class="btn btn-outline-primary dropdown-toggle rounded-pill px-4" data-bs-toggle="dropdown">
                <i class="fa-solid fa-circle-user me-1"></i> {{ user }}
              </button>
              <ul class="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 mt-2">
                <li><a class="dropdown-item py-2" href="#" @click="logout">Đăng xuất</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div class="card-header bg-primary text-white text-center py-4 border-0">
              <h3 class="mb-1 fw-bold">THÔNG TIN CÁ NHÂN</h3>
              <p class="mb-0 small opacity-75">Quản lý hồ sơ tài khoản của bạn</p>
            </div>

            <div class="card-body p-4 p-md-5 bg-white">
              <div class="text-center mb-5">
                <div class="d-inline-block position-relative">
                  <img :src="profileData.avatar" 
                       class="rounded-circle border border-4 border-light shadow" 
                       width="150" height="150" style="object-fit: cover;">
                  
                  <label for="uploadAvatar" class="btn btn-dark btn-sm position-absolute bottom-0 end-0 rounded-circle p-2 shadow">
                    <i class="fa-solid fa-camera p-1"></i>
                  </label>
                  <input type="file" id="uploadAvatar" hidden accept="image/*" @change="handleAvatarUpload">
                </div>
                <h4 class="mt-3 fw-bold text-dark">{{ user }}</h4>
              </div>

              <form @submit.prevent="saveProfile">
                <div class="mb-4">
                  <label class="form-label fw-bold small text-uppercase text-muted">Họ và tên</label>
                  <div class="input-group">
                    <span class="input-group-text bg-light border-end-0"><i class="fa-solid fa-user text-primary"></i></span>
                    <input v-model="profileData.fullName" type="text" class="form-control form-control-lg bg-light border-start-0 fs-6" required>
                  </div>
                </div>

                <div class="mb-4">
                  <label class="form-label fw-bold small text-uppercase text-muted">Địa chỉ Email</label>
                  <div class="input-group">
                    <span class="input-group-text bg-light border-end-0"><i class="fa-solid fa-envelope text-primary"></i></span>
                    <input v-model="profileData.email" type="email" class="form-control form-control-lg bg-light border-start-0 fs-6">
                  </div>
                </div>

                <div class="mb-4">
                  <label class="form-label fw-bold small text-uppercase text-muted">Mật khẩu mới</label>
                  <div class="input-group">
                    <span class="input-group-text bg-light border-end-0"><i class="fa-solid fa-key text-primary"></i></span>
                    <input v-model="profileData.password" type="password" class="form-control form-control-lg bg-light border-start-0 fs-6" placeholder="Để trống nếu không đổi">
                  </div>
                </div>

                <div class="d-grid gap-2 mt-5">
                  <button type="submit" class="btn btn-primary btn-lg fw-bold rounded-pill py-3 shadow">
                    LƯU THÔNG TIN CẬP NHẬT
                  </button>
                  <a href="/" class="btn btn-link text-decoration-none text-muted fw-semibold">Quay lại trang chủ</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

// --- STATE ---
const user = ref('');
const profileData = reactive({
  fullName: '',
  email: 'user@gmail.com',
  password: '',
  avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
});

// --- LIFECYCLE ---
onMounted(() => {
  const savedUser = localStorage.getItem('isLoggedIn');
  if (savedUser) {
    user.value = savedUser;
    profileData.fullName = savedUser;
    
    // Thử lấy avatar từ localStorage nếu đã lưu trước đó
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) profileData.avatar = savedAvatar;
  }
});

// --- METHODS ---
const handleAvatarUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileData.avatar = e.target.result;
      // Lưu avatar vào bộ nhớ ngay
      localStorage.setItem('userAvatar', e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const saveProfile = () => {
  if (profileData.fullName.trim()) {
    // Cập nhật tên người dùng
    localStorage.setItem('isLoggedIn', profileData.fullName);
    user.value = profileData.fullName;
    
    // Nếu có nhập mật khẩu mới, cập nhật password (giả định dùng accountPassword)
    if (profileData.password) {
      localStorage.setItem('accountPassword', profileData.password);
    }

    alert('Cập nhật hồ sơ thành công!');
    // Không cần reload trang vì Vue đã tự cập nhật hiển thị (Reactivity)
  }
};

const logout = () => {
  localStorage.removeItem('isLoggedIn');
  window.location.href = '/dang-nhap';
};
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}
.input-group-text {
  border-color: transparent;
}
.form-control:focus {
  box-shadow: none;
  border-color: #0d6efd;
}
</style>