<script setup>
import Bai1 from './components/Bai1.vue'
import Bai2 from './components/Bai2.vue'
import Bai3 from './components/Bai3.vue'
import {ref} from 'vue'
import CreatePost from './components/CreatePost.vue'
import PostList from './components/PostList.vue'

const posts = ref([
  { 
    title: 'Bật Mí 8 Nguyên Tắc Phối Màu Quần Áo Sành Điệu', 
    author: 'Nguyễn Văn Tèo', 
    content: 'Bạn có thể phối áo màu xanh lá, quần màu kem và giày màu tím theo cách phối màu kiểu tam giác. Hoặc có thể phối các set đồ cùng ton lạnh hoặc nóng ...', 
    textColor: 'black' 
  }
]);

function addPost(post) {
  posts.value.push(post);
}
</script>

<template>
  <!-- <Bai1/> -->
  <!-- <Bai2/> -->
  <!-- <Bai3/> -->
<div class="outer-wrapper">
    <div class="app-content">
      <CreatePost @add-post="addPost" />
      <hr class="section-divider" />
      <PostList :posts="posts" />
    </div>
  </div>
</template>

<style>
.outer-wrapper {
  border: 1px solid #999;
  padding: 20px;
  width: 100%; 
  max-width: 1100px; 
  margin: 0; 
  text-align: left;
}
.section-divider {
  border: none;
  border-top: 1px solid #ddd;
  margin: 2px;
}
</style>
