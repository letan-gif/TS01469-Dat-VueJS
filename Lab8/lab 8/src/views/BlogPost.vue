<template>
  <div>
    <h2>Chi tiết bài viết blog</h2>
    <p>Bạn đang xem nội dung của bài viết có <strong>ID: {{ $route.params.id }}</strong></p>
    <router-link to="/blog">Quay lại danh sách</router-link>
  </div>
</template>