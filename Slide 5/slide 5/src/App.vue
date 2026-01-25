<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Slide5 from './components/Slide5.vue'
import Slide51 from './components/Slide5.1.vue'
</script>

<template>
  <!-- <HelloWorld msg="Lê Tấn Đạt"/> -->
  <Slide5 msg2="Đạt"/>
  <!-- <Slide51/> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
