<template>
  <div class="home">
    <h1>Chào mừng đến với MyBlog [cite: 9, 16]</h1>
    <nav>
      <router-link to="/">Trang chủ</router-link> |
      <router-link to="/blog">Danh sách Blog</router-link> |
      <router-link to="/profile">Hồ sơ của tôi</router-link> |
      <router-link to="/dashboard">Bảng điều khiển</router-link>
    </nav>
    <div style="margin-top: 20px;">
      <button @click="goToDashboard">Đi đến Dashboard (Lập trình)</button> [cite: 44, 161, 162]
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToDashboard() {
      // Điều hướng bằng lập trình sử dụng tên Route [cite: 44, 162]
      this.$router.push({ name: 'Dashboard' });
    }
  }
}
</script>