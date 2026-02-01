<template>
  <div class="profile">
    <h2>Trang thông tin cá nhân [cite: 19]</h2>
    <p>(Bạn cũng có thể truy cập trang này qua đường dẫn /me) [cite: 46, 89]</p>
    <nav>
      <router-link to="/profile/info">Thông tin cơ bản</router-link> | [cite: 32, 156]
      <router-link to="/profile/settings">Cài đặt</router-link> [cite: 33, 156]
    </nav>
    <div class="content-box" style="border: 1px solid #ccc; padding: 10px; margin-top: 10px;">
      <router-view></router-view>
    </div>
  </div>
</template>