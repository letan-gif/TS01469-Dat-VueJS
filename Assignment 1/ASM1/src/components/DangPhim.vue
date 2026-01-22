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
            <li class="nav-item"><a class="nav-link px-3" href="/Assignment 1/ASM1/src/components/index.vue"><i class="fa-solid fa-house me-1"></i>Trang chủ</a></li>
            <li class="nav-item"><a class="nav-link active fw-bold text-primary px-3" href="/Assignment 1/ASM1/src/components/DangPhim.vue"><i class="fa-solid fa-cloud-arrow-up me-1"></i>Đăng phim</a></li>
            <li class="nav-item"><a class="nav-link px-3" href="/Assignment 1/ASM1/src/components/BinhLuan.vue"><i class="fa-solid fa-comments me-1"></i>Bình luận</a></li>
            <li class="nav-item"><a class="nav-link px-3" href="/Assignment 1/ASM1/src/components/DanhSach.vue"><i class="fa-solid fa-address-card me-1"></i>Danh sách</a></li>
          </ul>

          <div class="d-flex align-items-center">
            <template v-if="!user">
              <a href="/Assignment 1/ASM1/src/components/Dangky.vue" class="btn btn-white bg-white border rounded-pill px-4 me-2 shadow-sm">Đăng ký</a>
              <a href="/Assignment 1/ASM1/src/components/DangNhap.vue" class="btn btn-primary rounded-pill px-4 shadow-sm">Đăng nhập</a>
            </template>
            <div v-else class="dropdown">
              <button class="btn btn-outline-primary dropdown-toggle rounded-pill px-4 shadow-sm fw-bold" data-bs-toggle="dropdown">
                Hi, {{ user }}
              </button>
              <ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2 rounded-3">
                <li><a class="dropdown-item" href="#">Cá nhân</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger" href="#" @click="logout">Đăng xuất</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <div class="card shadow border-0 p-4 rounded-4">
            <h3 class="text-center text-primary fw-bold mb-4">ĐĂNG PHIM MỚI</h3>
            
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label class="form-label fw-bold">Tiêu đề phim:</label>
                <input v-model="movieData.title" type="text" class="form-control" placeholder="Nhập tên phim..." required>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Nội dung tóm tắt:</label>
                <textarea v-model="movieData.content" class="form-control" rows="4" placeholder="Viết mô tả ngắn..." required></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Chọn ảnh bìa:</label>
                <input type="file" @change="handleFileUpload" class="form-control" accept="image/*" required>
                <div v-if="previewImage" class="mt-3 text-center">
                  <img :src="previewImage" class="img-thumbnail" style="max-height: 200px;">
                </div>
              </div>

              <button type="submit" class="btn btn-success w-100 fw-bold py-2 rounded-pill" :disabled="isSubmitting">
                <i v-if="!isSubmitting" class="fa-solid fa-paper-plane me-2"></i>
                <span v-else class="spinner-border spinner-border-sm me-2"></span>
                {{ isSubmitting ? 'ĐANG XỬ LÝ...' : 'ĐĂNG PHIM NGAY' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

// --- STATE ---
const user = ref(null);
const previewImage = ref(null);
const isSubmitting = ref(false);
const movieData = reactive({
  title: '',
  content: '',
  image: null
});

// --- LIFECYCLE ---
onMounted(() => {
  user.value = localStorage.getItem('isLoggedIn');
});

// --- METHODS ---

// Xử lý khi chọn file (Chuyển sang Base64)
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result; // Để hiển thị preview
      movieData.image = e.target.result;   // Lưu chuỗi để gửi vào localStorage
    };
    reader.readAsDataURL(file);
  }
};

// Xử lý gửi form
const handleSubmit = () => {
  if (!user.value) {
    alert("Vui lòng đăng nhập trước khi đăng phim!");
    return;
  }

  if (!movieData.image) {
    alert("Vui lòng chọn ảnh cho phim!");
    return;
  }

  isSubmitting.value = true;

  try {
    const newMovie = {
      ...movieData,
      author: user.value,
      date: new Date().toLocaleDateString('vi-VN')
    };

    // Lấy danh sách cũ, thêm mới vào đầu và lưu lại
    let movies = JSON.parse(localStorage.getItem('userMovies')) || [];
    movies.unshift(newMovie);
    localStorage.setItem('userMovies', JSON.stringify(movies));

    alert("Chúc mừng! Phim của bạn đã được đăng thành công.");
    
    // Điều hướng về trang chủ
    window.location.href = 'index.html'; 
  } catch (error) {
    console.error(error);
    alert("Có lỗi xảy ra khi lưu phim.");
  } finally {
    isSubmitting.value = false;
  }
};

const logout = () => {
  localStorage.removeItem('isLoggedIn');
  user.value = null;
  location.reload();
};
</script>

<style scoped>
.card {
  transition: transform 0.3s;
}
.card:hover {
  transform: translateY(-5px);
}
</style>