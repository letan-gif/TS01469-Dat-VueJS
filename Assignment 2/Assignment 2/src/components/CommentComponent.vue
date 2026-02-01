<script setup>
import { ref, onMounted } from 'vue'

const commentText = ref('')
const comments = ref([])

onMounted(() => {
  comments.value = JSON.parse(localStorage.getItem('comments')) || []
})

const addComment = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'))

  comments.value.push({
    author: user.email,
    content: commentText.value
  })

  localStorage.setItem('comments', JSON.stringify(comments.value))
  commentText.value = ''
}
</script>

<template>
  <div class="card p-4 mx-auto" style="max-width:600px">
    <h4 class="mb-3">💬 Bình luận</h4>

    <textarea v-model="commentText"
              class="form-control mb-3"
              placeholder="Nhập bình luận..."></textarea>

    <button class="btn btn-success mb-3"
            @click="addComment">
      Gửi bình luận
    </button>

    <div v-for="(c, index) in comments"
         :key="index"
         class="border rounded p-2 mb-2">
      <strong>{{ c.author }}</strong>
      <div>{{ c.content }}</div>
    </div>
  </div>
</template>
