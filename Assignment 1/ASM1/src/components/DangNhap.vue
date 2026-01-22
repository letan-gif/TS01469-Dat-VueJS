<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="border p-4 rounded shadow-sm bg-white">
          <h4 class="mb-4 text-center text-primary fw-bold">Đăng Nhập Hệ Thống</h4>
          
          <form @submit.prevent="handleLogin" class="needs-validation" :class="{'was-validated': submitted}">
            
            <div class="mb-3">
              <label class="form-label fw-bold">Email</label>
              <input 
                v-model="loginData.email" 
                type="email" 
                class="form-control" 
                placeholder="Nhập email đã đăng ký" 
                required
              >
              <div class="invalid-feedback">Vui lòng nhập email hợp lệ.</div>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Mật Khẩu</label>
              <input 
                v-model="loginData.password" 
                type="password" 
                class="form-control" 
                placeholder="Nhập mật khẩu" 
                required
              >
              <div class="invalid-feedback">Vui lòng nhập mật khẩu.</div>
            </div>

            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-success py-2 fw-bold">
                Đăng Nhập
              </button>
              <a href="Dangky.html" class="btn btn-link btn-sm text-decoration-none text-center">
                Chưa có tài khoản? Đăng ký ngay
              </a>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

// Khởi tạo state cho form
const loginData = reactive({
  email: '',
  password: ''
});

const submitted = ref(false);

const handleLogin = () => {
  submitted.value = true;

  // 1. Lấy thông tin tài khoản đã lưu từ LocalStorage
  const savedEmail = localStorage.getItem('accountEmail');
  const savedPassword = localStorage.getItem('accountPassword');

  // 2. Kiểm tra tính hợp lệ của dữ liệu
  if (!loginData.email || !loginData.password) return;

  // 3. So sánh dữ liệu nhập vào với dữ liệu đã lưu
  if (loginData.email === savedEmail && loginData.password === savedPassword) {
    // Lưu trạng thái đăng nhập (sử dụng email làm định danh)
    localStorage.setItem('isLoggedIn', loginData.email);
    
    alert('Đăng nhập thành công! Chào mừng bạn quay trở lại.');
    
    // Điều hướng về trang chủ
    window.location.href = 'index.html';
  } else {
    alert('Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại!');
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
}
.border {
  border-radius: 15px !important;
}
</style>