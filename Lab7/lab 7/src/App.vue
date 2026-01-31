<script setup>
import Bai1 from './components/Bai1.vue'
import Bai2 from './components/Bai2.vue'
import Bai3 from './components/Bai3.vue'
import { ref } from 'vue';
import LoginComponent from './components/LoginComponent.vue';
import CommentComponent from './/components/CommentComponent.vue';

// Quản lý trạng thái đăng nhập và tên người dùng đã đăng nhập
const isLoggedIn = ref(false);
const loggedInUser = ref('');

// Xử lý khi người dùng đăng nhập thành công
function handleLoginSuccess(username) {
  loggedInUser.value = username;
  isLoggedIn.value = true;
}

</script>

<template>
<!-- <Bai1/> -->
<!-- <Bai2/> -->
<!-- <Bai3/> -->
  <div>
    <!--Nếu người dùng chưa đăng nhập, hiển thị form đăng nhập -->
    <LoginComponent
      v-if="!isLoggedIn"
      @loggedIn="handleLoginSuccess"
    /> 

    <!--Nếu người dùng đã đăng nhập, hiển thị component bình luận -->
    <CommentComponent
      v-else
      :username="loggedInUser"
    />
  </div>
</template>

<style scoped>

</style>
