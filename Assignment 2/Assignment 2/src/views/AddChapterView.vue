<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['id'])
const router = useRouter()
const story = ref(null)
const title = ref('')
const content = ref('')

onMounted(() => {
  const stories = JSON.parse(localStorage.getItem('stories')) || []
  story.value = stories.find(s => s.id === props.id)
})

const saveChapter = () => {
  if (!title.value || !content.value) return alert('Nhập đủ thông tin')
  if (!story.value.chapters) story.value.chapters = []
  
  story.value.chapters.push({ title: title.value, content: content.value, comments: [] })
  
  const stories = JSON.parse(localStorage.getItem('stories')) || []
  const index = stories.findIndex(s => s.id === props.id)
  stories[index] = story.value
  localStorage.setItem('stories', JSON.stringify(stories))
  router.push('/story/' + props.id)
}
</script>

<template>
  <div class="container card p-4">
    <h4>➕ Thêm chương</h4>
    <input class="form-control mb-2" v-model="title" placeholder="Tên chương">
    <textarea class="form-control mb-3" rows="6" v-model="content" placeholder="Nội dung"></textarea>
    <button class="btn btn-success" @click="saveChapter">💾 Lưu chương</button>
  </div>
</template>