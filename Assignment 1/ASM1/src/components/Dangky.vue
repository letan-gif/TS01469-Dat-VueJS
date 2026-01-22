<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="border p-4 rounded bg-white shadow-sm">
          <h4 class="mb-3 text-center">Form Đăng Ký Thông Tin</h4>

          <form @submit.prevent="handleRegister" class="needs-validation" :class="{ 'was-validated': submitted }">
            
            <div class="mb-3">
              <label class="form-label">Họ và Tên</label>
              <input v-model="form.fullName" type="text" class="form-control" placeholder="Nhập họ và tên" required>
            </div>

            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="form.email" type="email" class="form-control" placeholder="Nhập email" required>
            </div>

            <div class="mb-3">
              <label class="form-label">Số Điện Thoại</label>
              <input v-model="form.phone" type="text" class="form-control" placeholder="Nhập số điện thoại" required>
            </div>

            <div class="mb-3">
              <label class="form-label">Mật Khẩu</label>
              <input v-model="form.password" type="password" class="form-control" placeholder="Nhập mật khẩu" required>
            </div>

            <div class="mb-3">
              <label class="form-label">Xác Nhận Mật Khẩu</label>
              <input v-model="form.confirmPassword" type="password" class="form-control" placeholder="Xác nhận mật khẩu" required>
              <div v-if="passwordMismatch" class="text-danger small mt-1">Mật khẩu xác nhận không khớp!</div>
            </div>

            <div class="mb-3">
              <label class="form-label d-block">Giới Tính</label>
              <div class="form-check form-check-inline">
                <input v-model="form.gender" class="form-check-input" type="radio" name="gender" id="male" value="Nam">
                <label class="form-check-label" for="male">Nam</label>
              </div>
              <div class="form-check form-check-inline">
                <input v-model="form.gender" class="form-check-input" type="radio" name="gender" id="female" value="Nữ">
                <label class="form-check-label" for="female">Nữ</label>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Ngôn Ngữ</label>
              <select v-model="form.language" class="form-select" required>
                <option value="">-- Chọn ngôn ngữ --</option>
                <option value="Tiếng Việt">Tiếng Việt</option>
                <option value="Tiếng Anh">Tiếng Anh</option>
              </select>
            </div>

            <div class="form-check mb-3">
              <input v-model="form.agree" class="form-check-input" type="checkbox" id="agree" required>
              <label class="form-check-label" for="agree">
                Tôi đồng ý với các điều khoản và điều kiện
              </label>
              <div class="invalid-feedback">
                Bạn phải đồng ý trước khi đăng ký
              </div>
            </div>

            <div class="text-center">
              <button type="submit" class="btn btn-success px-5">
                Đăng Ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

// Quản lý trạng thái form bằng reactive
const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  gender: 'Nam',
  language: '',
  agree: false
});

const submitted = ref(false);

// Kiểm tra mật khẩu khớp nhau
const passwordMismatch = computed(() => {
  return form.confirmPassword !== '' && form.password !== form.confirmPassword;
});

const handleRegister = () => {
  submitted.value = true;

  // Kiểm tra logic trước khi lưu
  if (passwordMismatch.value) {
    alert('Mật khẩu xác nhận không khớp!');
    return;
  }

  if (form.fullName && form.email && form.password && form.agree) {
    // Lưu vào LocalStorage
    localStorage.setItem('accountEmail', form.email);
    localStorage.setItem('accountPassword', form.password);
    localStorage.setItem('accountFullName', form.fullName); // Lưu thêm tên để hiển thị sau này

    alert('Đăng ký thành công!');
    
    // Điều hướng (Nếu dùng Vue Router thì dùng router.push)
    window.location.href = 'Dangnhap.html';
  }
};
</script>

<style scoped>
/* Bạn có thể thêm CSS tùy chỉnh tại đây */
.container {
  max-width: 1200px;
}
</style>