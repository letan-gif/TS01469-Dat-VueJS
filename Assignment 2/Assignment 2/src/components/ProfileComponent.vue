<script setup>
import { ref } from 'vue'

const user = ref(JSON.parse(localStorage.getItem('currentUser')))
</script>

<template>
  <div class="card p-4 mx-auto" style="max-width:400px">
    <h4 class="mb-3">👤 Thông tin cá nhân</h4>

    <div class="mb-2">
      <label class="form-label">Email</label>
      <input class="form-control" :value="user.email" disabled>
    </div>

    <div class="alert alert-info">
      Thông tin demo – có thể mở rộng chỉnh sửa sau
    </div>
  </div>
</template>
