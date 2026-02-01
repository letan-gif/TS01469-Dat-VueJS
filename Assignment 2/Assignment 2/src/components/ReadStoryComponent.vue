<script setup>
const props = defineProps({
  story: Object,
  user: Object
})

const emit = defineEmits(['add-chapter', 'read-chapter'])

const deleteChapter = (index) => {
  if (!props.user || props.user.email !== props.story.author) {
    alert('Bạn không có quyền xóa chương này')
    return
  }

  if (!confirm('Bạn có chắc muốn xóa chương này?')) return

  // ❌ Xóa đúng 1 chương theo index
  props.story.chapters.splice(index, 1)

  // 💾 Lưu lại localStorage
  const stories = JSON.parse(localStorage.getItem('stories')) || []
  const i = stories.findIndex(s => s.id === props.story.id)
  stories[i] = props.story
  localStorage.setItem('stories', JSON.stringify(stories))
}
</script>


<template>
  <div>
    <h2>{{ story.title }}</h2>
    <p>{{ story.description }}</p>

    <!-- THÊM CHƯƠNG -->
    <button
      v-if="user && user.email === story.author"
      class="btn btn-success mb-3"
      @click="emit('add-chapter', story)"
    >
      ➕ Thêm chương
    </button>

    <h4>Danh sách chương</h4>

    <ul class="list-group">
      <li
        v-for="(ch, i) in story.chapters"
        :key="i"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>📘 Chương {{ i + 1 }}: {{ ch.title }}</span>

        <div class="d-flex gap-2">
          <!-- ĐỌC -->
          <button
            class="btn btn-sm btn-primary"
            @click="emit('read-chapter', ch)"
          >
            Đọc
          </button>

          <!-- XÓA -->
          <button
            v-if="user && user.email === story.author"
            class="btn btn-sm btn-danger"
            @click="deleteChapter(i)"
          >
            Xóa
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
