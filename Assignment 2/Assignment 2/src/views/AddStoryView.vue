<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const title = ref('')
const description = ref('')

const addStory = () => {
  const stories = JSON.parse(localStorage.getItem('stories')) || []
  const user = JSON.parse(localStorage.getItem('currentUser'))
  if (!user) return alert('Bạn cần đăng nhập')

  stories.push({
    id: crypto.randomUUID(),
    title: title.value,
    description: description.value,
    author: user.email,
    chapters: [],
    comments: []
  })
  localStorage.setItem('stories', JSON.stringify(stories))
  alert('Đăng thành công')
  router.push('/')
}
</script>

<template>
  <div class="container card p-4 mx-auto" style="max-width:600px">
    <h4>✍️ Đăng truyện</h4>
    <input v-model="title" class="form-control mb-3" placeholder="Tên truyện">
    <textarea v-model="description" class="form-control mb-3" rows="4" placeholder="Mô tả"></textarea>
    <button class="btn btn-primary w-100" @click="addStory">Đăng truyện</button>
  </div>
</template>