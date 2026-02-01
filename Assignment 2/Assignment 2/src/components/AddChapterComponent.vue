<script setup>
import { ref } from 'vue'

const props = defineProps({
  story: Object
})

const emit = defineEmits(['done'])

const title = ref('')
const content = ref('')

const saveChapter = () => {
  if (!title.value || !content.value) {
    alert('Nhập đầy đủ thông tin')
    return
  }

  // ✅ BẮT BUỘC
  if (!props.story.chapters) {
    props.story.chapters = []
  }

  props.story.chapters.push({
  title: title.value,
  content: content.value,
  comments: []
})


  const stories = JSON.parse(localStorage.getItem('stories')) || []
  const index = stories.findIndex(s => s.id === props.story.id)

  if (index !== -1) {
    stories[index] = props.story
    localStorage.setItem('stories', JSON.stringify(stories))
  }

  // reset form
  title.value = ''
  content.value = ''

  // quay lại màn đọc
  emit('done')
}
</script>

<template>
  <div class="card p-4">
    <h4>➕ Thêm chương</h4>

    <input
      class="form-control mb-2"
      v-model="title"
      placeholder="Tên chương"
    >

    <textarea
      class="form-control mb-3"
      rows="6"
      v-model="content"
      placeholder="Nội dung chương"
    ></textarea>

    <button class="btn btn-success" @click="saveChapter">
      💾 Lưu chương
    </button>
  </div>
</template>
