<template>
  <div class="col-sm-4 m-5">
    <h2>Bình luận bài viết</h2>

    <div class="card">
      <img src="../assets/img.png" alt="Hình ảnh" />
      <div class="card-body">
        <h5 class="card-title">Bài rau củ quả xanh</h5>
        <p class="card-text">
          Xanh là khoảng chất cần thiết đối với cơ thể người. Có nhiều cách bổ sung
          chất xanh, trong đó sử dụng đúng ăn uống là cách tốt nhất. Có 6 loại rau củ
          quả xanh...
        </p>
      </div>
    </div>

    <form @submit.prevent="submitComment" class="mt-3">
      <div class="mb-3">
        <textarea
          class="form-control"
          cols="60"
          v-model="commentText"
          placeholder="Nhập bình luận của bạn"
        ></textarea>
      </div>

      <button type="submit" class="btn btn-success">
        Gửi bình luận
      </button>
    </form>

    <div v-if="comments.length" class="mt-3">
      <h5>Danh sách các bình luận:</h5>
      <ul style="list-style-type: circle;">
        <li v-for="(comment, index) in comments" :key="index">
          <p>
            <strong>{{ comment.name }}</strong>: {{ comment.text }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['username']);

const commentText = ref('');

// Mảng chứa các bình luận đã gửi
const comments = ref([]);

// Xử lý gửi bình luận
function submitComment() {
  if (commentText.value) {
    // Thêm bình luận mới vào mảng comments
    comments.value.push({
      name: props.username, // sử dụng tên từ props
      text: commentText.value
    });

    // Xóa dữ liệu trong form sau khi gửi
    commentText.value = '';
  }
}
</script>
