<template>
    <div>
        <h3>{{ msg2 }}</h3>
        <input type="" name="" v-bind:value="diem">
        <br>
        <input type="" name="" v-model="diem">
        <h3>Điểm: {{ diem }}</h3>
    <div>
          <h3>Tên: {{ user1.name }}</h3>
          <h3>Tuổi: {{user1.age}}</h3>
          <button @click = "tangTuoi1">Tăng tuổi 1</button>
    </div>
    <div>
        <h3>Tên: {{ user2.name }}</h3>
        <h3>Tuổi: {{user2.age}}</h3>
        <button @click="tangTuoi2">Tăng tuổi 2</button>
    </div>
    </div>
</template>
<script setup>
      import { ref, reactive } from 'vue'
      defineProps({
         msg2: String,
      })
      
      const diem = ref(0)

      const user1 = ref({
        name: 'Lê Tấn Đạt',
        age: 19
      })

      const tangTuoi1 = () => {
        user1.value.age++
      }

      const user2 = reactive({
        name: 'Lê Tấn Đạt',
        age: 19
      })

      const tangTuoi2 = () => {
        user2.age++
      }

</script>
<style scoped>

</style>
