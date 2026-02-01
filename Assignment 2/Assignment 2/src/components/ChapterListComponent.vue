<script setup>
import { ref, onMounted } from 'vue'

const stories = ref([])
const selectedStory = ref(null)

onMounted(() => {
  stories.value = JSON.parse(localStorage.getItem('stories')) || []
})

const chooseStory = (story) => {
  selectedStory.value = story
}
</script>

<template>
  <div>
    <h4 class="mb-3">📚 Danh sách chương</h4>

    <button v-for="story in stories"
            class="btn btn-outline-primary me-2 mb-2"
            @click="chooseStory(story)">
      {{ story.title }}
    </button>

    <div v-if="selectedStory">
      <h5 class="mt-4">{{ selectedStory.title }}</h5>

      <ul class="list-group">
        <li v-for="(c, index) in selectedStory.chapters"
            class="list-group-item">
          {{ c.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
