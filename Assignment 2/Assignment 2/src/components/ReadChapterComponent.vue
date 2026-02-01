<script setup>
import { ref } from 'vue'

const props = defineProps({
  chapter: Object,
  user: Object
})

const emit = defineEmits(['back'])

const comment = ref('')
const comments = ref(props.chapter.comments || [])

const sendComment = () => {
  if (!comment.value || !props.user) return

  comments.value.push({
    user: props.user.email,
    content: comment.value
  })

  props.chapter.comments = comments.value

  const stories = JSON.parse(localStorage.getItem('stories')) || []
  localStorage.setItem('stories', JSON.stringify(stories))

  comment.value = ''
}
</script>

<template>
  <div class="card p-4">
    <button class="btn btn-secondary mb-3" @click="$emit('back')">
      ⬅ Quay lại
    </button>

    <h3>{{ chapter.title }}</h3>
    <p style="white-space: pre-line">{{ chapter.content }}</p>

    <hr>

    <h5>Bình luận</h5>

    <textarea
      class="form-control mb-2"
      v-model="comment"
      placeholder="Nhập bình luận..."
    ></textarea>

    <button class="btn btn-success mb-3" @click="sendComment">
      Gửi bình luận
    </button>

    <ul class="list-group">
      <li
        v-for="(c, i) in comments"
        :key="i"
        class="list-group-item"
      >
        <b>{{ c.user }}:</b> {{ c.content }}
      </li>
    </ul>
  </div>
</template>
