<script setup>
import { ref, onMounted } from 'vue'
const stories = ref([])
const selectedStory = ref(null)

onMounted(() => {
  stories.value = JSON.parse(localStorage.getItem('stories')) || []
})
</script>

<template>
  <div class="container">
    <h4>📚 Danh sách chương toàn bộ</h4>
    <button v-for="story in stories" :key="story.id" class="btn btn-outline-primary me-2 mb-2" @click="selectedStory = story">
      {{ story.title }}
    </button>
    <div v-if="selectedStory">
      <h5 class="mt-4">{{ selectedStory.title }}</h5>
      <ul class="list-group">
        <li v-for="(c, index) in selectedStory.chapters" :key="index" class="list-group-item">
          {{ c.title }}
        </li>
      </ul>
    </div>
  </div>
</template>