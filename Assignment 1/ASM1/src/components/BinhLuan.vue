<template>
  <div class="bg-light min-vh-100">
    <nav class="navbar navbar-expand-lg sticky-top shadow-sm border-bottom" style="background-color: #e3f2fd;">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img src="/images/Logo-phim.png" alt="Logo" width="130">
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link px-3" href="/"><i class="fa-solid fa-house me-1"></i>Trang chủ</a></li>
            <li class="nav-item"><a class="nav-link px-3" href="/dang-phim"><i class="fa-solid fa-cloud-arrow-up me-1"></i>Đăng phim</a></li>
            <li class="nav-item"><a class="nav-link active fw-bold text-primary px-3" href="#"><i class="fa-solid fa-comments me-1"></i>Bình luận</a></li>
            <li class="nav-item"><a class="nav-link px-3" href="/gioi-thieu"><i class="fa-solid fa-address-card me-1"></i>Giới thiệu</a></li>
          </ul>

          <div class="d-flex align-items-center">
            <template v-if="!currentUser">
              <a href="/dang-ky" class="btn btn-white bg-white border rounded-pill px-4 me-2 shadow-sm">Đăng ký</a>
              <a href="/dang-nhap" class="btn btn-primary rounded-pill px-4 shadow-sm">Đăng nhập</a>
            </template>
            <div v-else class="dropdown">
              <button class="btn btn-outline-primary dropdown-toggle rounded-pill px-4 shadow-sm fw-bold" data-bs-toggle="dropdown">
                <i class="fa-solid fa-user-circle me-1"></i> Hi, {{ currentUser }}
              </button>
              <ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2 rounded-3">
                <li><a class="dropdown-item py-2" href="#"><i class="fa-solid fa-id-card me-2 text-primary"></i>Cá nhân</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger py-2" href="#" @click="logout"><i class="fa-solid fa-power-off me-2"></i>Đăng xuất</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="container mt-5">
      <div v-if="selectedMovie" class="row bg-white p-4 rounded-4 shadow-sm border-0">
        <div class="col-md-4">
          <img :src="selectedMovie.image" class="img-fluid rounded-4 shadow-sm" alt="Thumbnail">
        </div>
        <div class="col-md-8">
          <h2 class="fw-bold text-primary mb-3">{{ selectedMovie.title }}</h2>
          <div class="badge bg-info mb-3">Đang chiếu</div>
          <hr>
          <p class="text-secondary" style="line-height: 1.8; text-align: justify;">
            {{ movieDescription }}
          </p>
        </div>
      </div>

      <div v-else class="alert alert-warning mt-4">
        <i class="fa-solid fa-triangle-exclamation me-2"></i>
        Vui lòng chọn một bộ phim từ trang chủ để xem thông tin chi tiết!
      </div>

      <div class="card mt-4 p-4 border-0 shadow-sm rounded-4 mb-5">
        <h5 class="fw-bold mb-3"><i class="fa-solid fa-comments me-2 text-primary"></i>Bình luận từ cộng đồng</h5>
        
        <div class="mb-3">
          <textarea 
            v-model="commentText"
            class="form-control border-2 rounded-3" 
            rows="3" 
            placeholder="Chia sẻ cảm nghĩ của bạn về bộ phim này..."
          ></textarea>
        </div>
        <div class="text-end">
          <button @click="postComment" class="btn btn-primary px-5 rounded-pill fw-bold">Gửi bình luận</button>
        </div>

        <hr class="my-4">

        <div class="mt-2">
          <div v-if="comments.length === 0" class="text-center text-muted py-3">
            Chưa có bình luận nào. Hãy là người đầu tiên!
          </div>
          
          <div v-for="(cmt, index) in comments" :key="index" 
               class="d-flex mb-3 p-3 bg-light rounded-3 shadow-sm border-start border-primary border-4 animate__animated animate__fadeIn">
            <div class="flex-shrink-0">
              <i class="fa-solid fa-circle-user fa-3x text-secondary"></i>
            </div>
            <div class="flex-grow-1 ms-3">
              <div class="fw-bold text-primary">
                {{ cmt.user }} 
                <span class="badge bg-secondary ms-2 fw-normal" style="font-size: 0.7rem;">{{ cmt.time }}</span>
              </div>
              <div class="text-dark mt-1">{{ cmt.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

// --- STATE ---
const selectedMovie = ref(null);
const currentUser = ref(null);
const commentText = ref('');
const comments = ref([]);

// --- COMPUTED ---
const movieDescription = computed(() => {
  if (!selectedMovie.value) return "";
  return selectedMovie.value.content || selectedMovie.value.cot || "Phim này chưa có nội dung mô tả chi tiết.";
});

// --- LIFECYCLE ---
onMounted(() => {
  // Load thông tin phim từ sessionStorage
  const savedMovie = sessionStorage.getItem('selectedMovie');
  if (savedMovie) {
    selectedMovie.value = JSON.parse(savedMovie);
  }

  // Load trạng thái đăng nhập
  currentUser.value = localStorage.getItem('isLoggedIn');
});

// --- METHODS ---
const postComment = () => {
  if (!currentUser.value) {
    alert("Bạn cần đăng nhập để thực hiện chức năng này!");
    // window.location.href = 'DangNhap.html'; // Hoặc dùng router.push
    return;
  }

  if (commentText.value.trim() === "") {
    alert("Vui lòng nhập nội dung bình luận!");
    return;
  }

  // Thêm bình luận mới vào đầu mảng (Unshift)
  const timeNow = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  
  comments.value.unshift({
    user: currentUser.value,
    time: timeNow,
    content: commentText.value
  });

  // Reset input
  alert(`Cảm ơn ${currentUser.value} đã để lại ý kiến!`);
  commentText.value = "";
};

const logout = () => {
  if (confirm("Bạn muốn đăng xuất?")) {
    localStorage.removeItem('isLoggedIn');
    currentUser.value = null;
    location.reload();
  }
};
</script>

<style scoped>
.animate__fadeIn {
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>