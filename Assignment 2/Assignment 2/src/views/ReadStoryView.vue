<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['id', 'user'])
const router = useRouter()
const story = ref(null)

onMounted(() => {
  const stories = JSON.parse(localStorage.getItem('stories')) || []
  story.value = stories.find(s => s.id === props.id)
})

const deleteChapter = (index) => {
  if (!props.user || props.user.email !== story.value.author) return
  if (!confirm('Xóa chương này?')) return
  story.value.chapters.splice(index, 1)
  const stories = JSON.parse(localStorage.getItem('stories')) || []
  const i = stories.findIndex(s => s.id === props.id)
  stories[i] = story.value
  localStorage.setItem('stories', JSON.stringify(stories))
}
</script>

<template>
  <div v-if="story" class="container">
    <h2>{{ story.title }}</h2>
    <p>{{ story.description }}</p>
    <button v-if="user && user.email === story.author" class="btn btn-success mb-3"
            @click="router.push(`/story/${id}/add-chapter`)">➕ Thêm chương</button>
    <h4>Danh sách chương</h4>
    <ul class="list-group">
      <li v-for="(ch, i) in story.chapters" :key="i" class="list-group-item d-flex justify-content-between">
        <span>📘 Chương {{ i + 1 }}: {{ ch.title }}</span>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-primary" @click="router.push(`/story/${id}/chapter/${i}`)">Đọc</button>
          <button v-if="user && user.email === story.author" class="btn btn-sm btn-danger" @click="deleteChapter(i)">Xóa</button>
        </div>
      </li>
    </ul>
  </div>
</template>