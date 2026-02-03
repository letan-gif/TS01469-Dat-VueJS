<template>
  <div id="app">
    <nav class="main-nav">
      <router-link to="/">Trang chủ</router-link> |
      <router-link to="/blog">Blog</router-link> |
      <router-link to="/profile">Hồ sơ (Profile)</router-link> |
      <router-link to="/me">Về tôi (/me)</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/login">Đăng nhập</router-link>
    </nav>

    <hr />

    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Arial, sans-serif;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.main-nav {
  padding: 15px 0;
  background-color: #f8f9fa;
  text-align: center;
}

.main-nav a {
  margin: 0 10px;
  text-decoration: none;
  font-weight: bold;
  color: #2c3e50;
}

.router-link-active {
  color: #42b983 !important;
  border-bottom: 2px solid #42b983;
}

.main-content {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-top: 20px;
}
</style>