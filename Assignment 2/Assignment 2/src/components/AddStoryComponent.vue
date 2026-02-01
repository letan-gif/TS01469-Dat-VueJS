<script setup>
import { ref } from 'vue'

const title = ref('')
const description = ref('')

const addStory = () => {
  const stories = JSON.parse(localStorage.getItem('stories')) || []
  const user = JSON.parse(localStorage.getItem('currentUser'))

  if (!user) {
    alert('Bạn cần đăng nhập')
    return
  }

  stories.push({
    id: crypto.randomUUID(),
    title: title.value,
    description: description.value,
    author: user.email,      // ✅ SỬA Ở ĐÂY
    chapters: [],
    comments: []
  })

  localStorage.setItem('stories', JSON.stringify(stories))
  alert('Đăng truyện thành công')

  title.value = ''
  description.value = ''
}
</script>

<template>
  <div class="card p-4 mx-auto" style="max-width:600px">
    <h4 class="mb-3">✍️ Đăng truyện</h4>

    <input
      v-model="title"
      class="form-control mb-3"
      placeholder="Tên truyện"
    >

    <textarea
      v-model="description"
      class="form-control mb-3"
      rows="4"
      placeholder="Mô tả nội dung"
    ></textarea>

    <button
      class="btn btn-primary w-100"
      @click="addStory"
    >
      Đăng truyện
    </button>
  </div>
</template>
