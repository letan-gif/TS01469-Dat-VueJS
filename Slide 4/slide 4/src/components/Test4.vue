<template>
  <div class="app-container">
    <div>
      Full Name: <input type="text" v-model="fullName">
    </div>
    <div>
      Email: <input type="text" v-model="email">
    </div>

    <button @click="showResult = !showResult">
      {{ showResult ? 'Hide' : 'Show' }}
    </button>

    <div v-show="showResult">
      <hr>
      <div v-if="fullName || email">
        <p>Your full name is: {{ fullName }}</p>
        <p>Your email is: {{ email }}</p>
        
        <hr>
        
        <p>Your full name is: {{ fullName }}</p>
        <p>Your email is: {{ email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullName: 'Test Full Name',
      email: '12', // Giá trị mặc định như trong ảnh bạn gửi
      showResult: true
    };
  }
};
</script>

<style scoped>
.app-container {
  text-align: center;
  font-family: sans-serif;
  margin-top: 50px;
}
input {
  margin: 5px;
}
button {
  display: block;
  margin: 10px auto;
}
hr {
  width: 200px;
}
</style>