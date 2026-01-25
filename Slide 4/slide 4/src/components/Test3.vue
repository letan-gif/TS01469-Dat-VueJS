<template>
  <div>
    <h2>Kiểm tra độ tuổi</h2>
    
    <label for="birthYear">Nhập năm sinh: </label>
    <input 
      id="birthYear" 
      type="number" 
      v-model.number="year" 
      placeholder="VD: 2000">

    <div v-if="year > 0" style="margin-top: 20px;">
      <p>Năm sinh của bạn: <b>{{ year }}</b></p>
      <p>Tuổi của bạn: <b>{{ age }}</b></p>
      <p>Phân loại: <b>{{ category }}</b></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: null 
    };
  },
  computed: {
    age() {
      const currentYear = new Date().getFullYear();
      return currentYear - this.year;
    },
    category() {
      const a = this.age;
      if (a < 0) return "Năm sinh không hợp lệ";
      if (a <= 12) return "Trẻ em";
      if (a <= 18) return "Thiếu niên";
      if (a <= 35) return "Thanh niên";
      if (a <= 60) return "Trung niên";
      return "Lớn tuổi";
    }
  }
};
</script>

<style scoped>
input {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #033ce6;
}
b { 
  color: #f11b1b;
}
</style>