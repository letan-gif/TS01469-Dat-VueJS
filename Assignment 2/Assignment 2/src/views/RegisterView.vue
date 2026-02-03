<!-- src/views/RegisterView.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Các biến reactive
const fullName = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const gender = ref('male') // Mặc định là Nam
const language = ref('')
const agreeTerms = ref(false)

// Hàm đăng ký
const register = () => {
  // Kiểm tra các trường bắt buộc
  if (!fullName.value || !email.value || !phone.value || !password.value || !confirmPassword.value || !language.value) {
    alert('Vui lòng điền đầy đủ thông tin')
    return
  }
  
  // Kiểm tra mật khẩu khớp
  if (password.value !== confirmPassword.value) {
    alert('Mật khẩu xác nhận không khớp')
    return
  }
  
  // Kiểm tra đồng ý điều khoản
  if (!agreeTerms.value) {
    alert('Bạn phải đồng ý với các điều khoản và điều kiện')
    return
  }

  const users = JSON.parse(localStorage.getItem('users')) || []
  
  // Kiểm tra email đã tồn tại chưa
  if (users.find(u => u.email === email.value)) {
    alert('Email này đã được đăng ký')
    return
  }

  // Tạo user mới với đầy đủ thông tin
  const newUser = {
    fullName: fullName.value,
    email: email.value,
    phone: phone.value,
    password: password.value,
    gender: gender.value,
    language: language.value
  }
  
  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))
  
  alert('Đăng ký thành công!')
  
  // Chuyển sang trang đăng nhập
  router.push('/login')
}
</script>

<template>
  <div class="card p-4 mx-auto shadow-sm" style="max-width:500px; margin-top: 30px;">
    <h4 class="text-center mb-3">📝 Form Đăng Ký Thông Tin</h4>
    
    <!-- Họ và Tên -->
    <div class="mb-2">
      <label class="form-label">Họ và Tên</label>
      <input v-model="fullName" class="form-control" placeholder="Nhập họ và tên">
    </div>
    
    <!-- Email -->
    <div class="mb-2">
      <label class="form-label">Email</label>
      <input v-model="email" class="form-control" placeholder="Nhập email">
    </div>
    
    <!-- Số Điện Thoại -->
    <div class="mb-2">
      <label class="form-label">Số Điện Thoại</label>
      <input v-model="phone" class="form-control" placeholder="Nhập số điện thoại">
    </div>
    
    <!-- Mật Khẩu -->
    <div class="mb-2">
      <label class="form-label">Mật Khẩu</label>
      <input v-model="password" type="password" class="form-control" placeholder="Nhập mật khẩu">
    </div>
    
    <!-- Xác Nhận Mật Khẩu -->
    <div class="mb-2">
      <label class="form-label">Xác Nhận Mật Khẩu</label>
      <input v-model="confirmPassword" type="password" class="form-control" placeholder="Xác nhận mật khẩu">
    </div>
    
    <!-- Giới Tính -->
    <div class="mb-2">
      <label class="form-label">Giới Tính</label>
      <div>
        <div class="form-check form-check-inline">
          <input v-model="gender" value="male" class="form-check-input" type="radio" id="male">
          <label class="form-check-label" for="male">Nam</label>
        </div>
        <div class="form-check form-check-inline">
          <input v-model="gender" value="female" class="form-check-input" type="radio" id="female">
          <label class="form-check-label" for="female">Nữ</label>
        </div>
      </div>
    </div>
    
    <!-- Ngôn Ngữ -->
    <div class="mb-2">
      <label class="form-label">Ngôn Ngữ</label>
      <select v-model="language" class="form-select">
        <option value="" disabled selected>-- Chọn ngôn ngữ --</option>
        <option value="vi">Tiếng Việt</option>
        <option value="en">English</option>
      </select>
    </div>
    
    <!-- Điều khoản -->
    <div class="mb-3">
      <div class="form-check">
        <input v-model="agreeTerms" class="form-check-input" type="checkbox" id="terms">
        <label class="form-check-label" for="terms">
          Tôi đồng ý với các điều khoản và điều kiện
        </label>
      </div>
      <small class="text-muted">Bạn phải đồng ý trước khi đăng ký</small>
    </div>
    
    <!-- Nút Đăng Ký -->
    <button class="btn btn-success w-100" @click="register">Đăng Ký</button>
    
    <div class="text-center mt-3">
      <router-link to="/login" class="btn btn-link">Đã có tài khoản? Đăng nhập</router-link>
    </div>
  </div>
</template>

<style scoped>
.form-label {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.form-control, .form-select {
  border-radius: 6px;
}

.card {
  border-radius: 10px;
}
</style>