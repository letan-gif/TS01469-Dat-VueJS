<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['id', 'chapterIndex', 'user'])
const router = useRouter()
const chapter = ref(null)
const comment = ref('')

onMounted(() => {
  const stories = JSON.parse(localStorage.getItem('stories')) || []
  const story = stories.find(s => s.id === props.id)
  chapter.value = story.chapters[props.chapterIndex]
})

const sendComment = () => {
  if (!comment.value || !props.user) return
  if (!chapter.value.comments) chapter.value.comments = []
  chapter.value.comments.push({ user: props.user.email, content: comment.value })
  
  const stories = JSON.parse(localStorage.getItem('stories')) || []
  const i = stories.findIndex(s => s.id === props.id)
  stories[i].chapters[props.chapterIndex] = chapter.value
  localStorage.setItem('stories', JSON.stringify(stories))
  comment.value = ''
}
</script>

<template>
  <div v-if="chapter" class="container card p-4">
    <button class="btn btn-secondary mb-3" @click="router.push('/story/' + id)">⬅ Quay lại</button>
    <h3>{{ chapter.title }}</h3>
    <p style="white-space: pre-line">{{ chapter.content }}</p>
    <hr>
    <h5>Bình luận</h5>
    <textarea v-model="comment" class="form-control mb-2"></textarea>
    <button class="btn btn-success mb-3" @click="sendComment">Gửi</button>
    <ul class="list-group">
      <li v-for="(c, i) in chapter.comments" :key="i" class="list-group-item">
        <b>{{ c.user }}:</b> {{ c.content }}
      </li>
    </ul>
  </div>
</template>