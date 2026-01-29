<template>
  <div>
    <h2>Nhập sản phẩm</h2>
    <input v-model="name" placeholder="Tên sản phẩm" />
    <br>
    <textarea v-model="description" placeholder="Mô tả"></textarea>
    <br>
    <input v-model="price" placeholder="Giá" type="number" />
    <br>
    <button class="btn-submit" @click="submitPost">Tạo</button>
  </div>
</template>
<script setup>
import { ref } from 'vue'

// ĐÃ CÓ defineEmits
const emit = defineEmits(['add-post'])

const name = ref('')
const description = ref('')
const price = ref('')

function submitPost() {
  if (name.value && description.value && price.value) {
    const newPost = {
      name: name.value,
      description: description.value,
      price: Number(price.value)
    }
    emit('add-post', newPost)

    name.value = ''
    description.value = ''
    price.value = ''
  } else {
    alert('Vui lòng điền đầy đủ thông tin!');
  }
}
</script>

<style>
input,
textarea {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.btn-submit{
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  border-radius: 5px;
}
</style>