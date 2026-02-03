<template>
  <div class="home">
    <h1>Chào mừng đến với MyBlog</h1>
    <nav>
      <router-link to="/">Trang chủ</router-link> |
      <router-link to="/blog">Danh sách Blog</router-link> |
      <router-link to="/profile">Hồ sơ của tôi</router-link> |
      <router-link to="/dashboard">Bảng điều khiển</router-link>
    </nav>
    <div style="margin-top: 20px;">
      <button @click="goToDashboard">Đi đến Dashboard (Lập trình)</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToDashboard() {
      this.$router.push({ name: 'Dashboard' });
    }
  }
}
</script>