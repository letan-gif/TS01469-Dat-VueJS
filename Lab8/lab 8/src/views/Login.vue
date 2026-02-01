<template>
  <div>
    <h2>Trang đăng nhập</h2>
    <p>Vui lòng nhấn nút bên dưới để giả lập đăng nhập thành công.</p>
    <button @click="login">Đăng nhập ngay</button>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      alert("Đăng nhập thành công! (Giả lập)"); 
      this.$router.push({ name: 'Dashboard' }); 
    }
  }
}
</script>