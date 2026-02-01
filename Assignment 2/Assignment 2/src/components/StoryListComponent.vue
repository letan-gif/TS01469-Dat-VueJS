<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['read-story'])
const stories = ref([])
const currentUser = JSON.parse(localStorage.getItem('currentUser'))

onMounted(() => {
  stories.value = JSON.parse(localStorage.getItem('stories')) || []
})

const deleteStory = (story) => {
  if (!currentUser || story.author !== currentUser.email) {
    alert('Bạn không có quyền xóa')
    return
  }

  if (!confirm(`Xóa truyện "${story.title}"?`)) return

  stories.value = stories.value.filter(s => s.id !== story.id)
  localStorage.setItem('stories', JSON.stringify(stories.value))
}
</script>

<template>
  <h2>Danh sách truyện</h2>

  <div v-for="story in stories" :key="story.id" class="card mb-3 p-3">
    <h5>{{ story.title }}</h5>
    <p>{{ story.description }}</p>

    <div class="d-flex gap-2">
      <button class="btn btn-primary" @click="$emit('read-story', story)">
        Đọc truyện
      </button>

      <button
        v-if="currentUser && story.author === currentUser.email"
        class="btn btn-danger"
        @click="deleteStory(story)"
      >
        Xóa
      </button>
    </div>
  </div>
</template>
