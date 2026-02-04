<!-- src/views/ProfileView.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)
const userDetails = ref(null)
const editMode = ref(false)

// Biến chỉnh sửa
const editName = ref('')
const editPhone = ref('')
const currentPass = ref('')
const newPass = ref('')

onMounted(() => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  user.value = currentUser
  if (currentUser) {
    const users = JSON.parse(localStorage.getItem('users')) || []
    userDetails.value = users.find(u => u.email === currentUser.email)
  }
})

const startEdit = () => {
  editMode.value = true
  editName.value = userDetails.value.fullName || ''
  editPhone.value = userDetails.value.phone || ''
}

const saveProfile = () => {
  if (newPass.value && newPass.value.length < 6) {
    alert('Mật khẩu mới phải có ít nhất 6 ký tự')
    return
  }

  // Kiểm tra mật khẩu
  if (currentPass.value !== userDetails.value.password) {
    alert('Mật khẩu hiện tại không đúng')
    return
  }

  // Cập nhật localStorage
  const users = JSON.parse(localStorage.getItem('users')) || []
  const index = users.findIndex(u => u.email === user.value.email)
  
  users[index].fullName = editName.value
  users[index].phone = editPhone.value
  if (newPass.value) {
    users[index].password = newPass.value
  }
  
  localStorage.setItem('users', JSON.stringify(users))
  editMode.value = false
  alert('Cập nhật thành công')
  location.reload()
}
</script>

<template>
  <div class="container mt-4">
    <div v-if="user && userDetails" class="card mx-auto" style="max-width:500px">
      <div class="card-header bg-primary text-white d-flex justify-content-between">
        <h4 class="mb-0">👤 Thông tin cá nhân</h4>
        <button v-if="!editMode" class="btn btn-sm btn-light" @click="startEdit">
          ✏️ Sửa
        </button>
      </div>
      
      <div class="card-body">
        <div v-if="!editMode">
          <!-- Hiển thị thông tin -->
          <div class="mb-3">
            <label class="form-label fw-bold">Họ tên</label>
            <div class="form-control bg-light">{{ userDetails.fullName || 'Chưa có' }}</div>
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Email</label>
            <div class="form-control bg-light">{{ user.email }}</div>
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Số điện thoại</label>
            <div class="form-control bg-light">{{ userDetails.phone || 'Chưa có' }}</div>
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Mật khẩu</label>
            <div class="form-control bg-light">********</div>
          </div>
        </div>
        
        <div v-else>
          <!-- Form chỉnh sửa -->
          <div class="mb-3">
            <label class="form-label fw-bold">Họ tên</label>
            <input v-model="editName" class="form-control" placeholder="Họ và tên">
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Số điện thoại</label>
            <input v-model="editPhone" class="form-control" placeholder="Số điện thoại">
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Mật khẩu hiện tại *</label>
            <input v-model="currentPass" type="password" class="form-control" placeholder="Nhập mật khẩu hiện tại">
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Mật khẩu mới</label>
            <input v-model="newPass" type="password" class="form-control" placeholder="Để trống nếu không đổi">
          </div>
          
          <div class="d-flex gap-2 mt-4">
            <button class="btn btn-success flex-grow-1" @click="saveProfile">
              💾 Lưu
            </button>
            <button class="btn btn-secondary" @click="editMode = false">
              ❌ Hủy
            </button>
          </div>
        </div>
      </div>
      
      <div class="card-footer" v-if="!editMode">
        <button class="btn btn-secondary w-100" @click="router.push('/')">
          ← Quay lại
        </button>
      </div>
    </div>
    
    <div v-else class="text-center mt-5">
      <p>Vui lòng đăng nhập.</p>
      <router-link to="/login" class="btn btn-primary">Đăng nhập</router-link>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 10px;
}
</style>