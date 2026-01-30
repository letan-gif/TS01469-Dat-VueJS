<template>
  <div class="container mt-4">
    <div class="row">
      <!-- FORM ĐĂNG KÝ -->
      <div class="col-md-6">
        <h4 class="mb-3">Form Đăng Ký</h4>

        <div class="mb-3">
          <label class="form-label">Họ tên:</label>
          <input type="text" class="form-control" v-model="form.name">
        </div>

        <div class="mb-3">
          <label class="form-label">Email:</label>
          <input type="email" class="form-control" v-model="form.email">
        </div>

        <div class="mb-3">
          <label class="form-label">Mật khẩu:</label>
          <input type="password" class="form-control" v-model="form.password">
        </div>

        <div class="mb-3">
          <label class="form-label">Ngày sinh:</label>
          <input type="date" class="form-control" v-model="form.birthday">
        </div>

        <div class="mb-3">
          <label class="form-label">Giới tính:</label><br>
          <input type="radio" value="Nam" v-model="form.gender"> Nam
          <input type="radio" value="Nữ" v-model="form.gender" class="ms-3"> Nữ
          <input type="radio" value="Khác" v-model="form.gender" class="ms-3"> Khác
        </div>

        <div class="mb-3">
          <label class="form-label">Ngôn ngữ:</label><br>
          <input type="checkbox" value="Tiếng Việt" v-model="form.languages"> Tiếng Việt
          <input type="checkbox" value="Tiếng Anh" v-model="form.languages" class="ms-3"> Tiếng Anh
          <input type="checkbox" value="Tiếng Nhật" v-model="form.languages" class="ms-3"> Tiếng Nhật
        </div>

        <button class="btn btn-primary" @click="register">
          Đăng ký
        </button>
      </div>

      <!-- THÔNG TIN ĐÃ ĐĂNG KÝ -->
      <div class="col-md-6">
        <h4 class="mb-3">Thông tin đã đăng ký:</h4>

        <p><strong>Họ tên:</strong> {{ result.name }}</p>
        <p><strong>Email:</strong> {{ result.email }}</p>
        <p><strong>Ngày sinh:</strong> {{ result.birthday }}</p>
        <p><strong>Giới tính:</strong> {{ result.gender }}</p>
        <p><strong>Ngôn ngữ:</strong> {{ result.languages.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  password: '',
  birthday: '',
  gender: '',
  languages: []
})

const result = ref({
  name: '',
  email: '',
  birthday: '',
  gender: '',
  languages: []
})

const register = () => {
  result.value = {
    name: form.value.name,
    email: form.value.email,
    birthday: form.value.birthday,
    gender: form.value.gender,
    languages: form.value.languages
  }
}
</script>
