<template>
  <div class="bg-light min-vh-100" style="font-family: 'Segoe UI', sans-serif;">
    
    <nav class="navbar navbar-expand-lg sticky-top shadow-sm border-bottom" style="background-color: #e3f2fd;">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="/Assignment 1/ASM1/src/assets/images/Logo-phim.png" alt="Logo" width="130">
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" v-for="item in menuItems" :key="item.path">
              <a class="nav-link px-3" :class="{ 'active fw-bold text-primary': item.active }" :href="item.path">
                <i :class="[item.icon, 'text-primary me-1']"></i>{{ item.text }}
              </a>
            </li>
          </ul>
          <div class="d-flex align-items-center">
            <template v-if="!isLoggedIn">
              <a href="Dangky.html" class="btn btn-white bg-white border rounded-pill px-4 me-2 shadow-sm">Đăng ký</a>
              <a href="DangNhap.html" class="btn btn-primary rounded-pill px-4 shadow-sm">Đăng nhập</a>
            </template>
            <div v-else class="dropdown">
              <button class="btn btn-outline-primary dropdown-toggle rounded-pill px-4 shadow-sm fw-bold" data-bs-toggle="dropdown">
                <i class="fa-solid fa-user-circle me-1"></i> Chào, {{ isLoggedIn }}
              </button>
              <ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2 rounded-3">
                <li><a class="dropdown-item py-2" href="GioiThieu.html"><i class="fa-solid fa-id-card me-2 text-primary"></i>Cá nhân</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger py-2" href="#" @click="logout"><i class="fa-solid fa-power-off me-2"></i>Đăng xuất</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="container mt-5">
      <div class="bg-white rounded-4 shadow-sm p-4 p-md-5 mb-5 border-0">
        <div class="row align-items-start">
          <div class="col-md-4 text-center">
            <img :src="hotMovie.image" class="img-fluid rounded-4 shadow-lg mb-4 mb-md-0" style="max-height: 550px; object-fit: cover;">
          </div>
          <div class="col-md-8 px-md-5">
            <span class="badge bg-danger mb-3 px-3 py-2 rounded-pill shadow-sm">Phim Nổi Bật</span>
            <h1 class="fw-bold text-dark display-5 mb-3">{{ hotMovie.title }}</h1>
            <div class="d-flex gap-4 mb-4 text-secondary fw-semibold border-bottom pb-3 flex-wrap">
              <span><i class="fa-solid fa-star text-warning me-1"></i> {{ hotMovie.rating }}</span>
              <span><i class="fa-solid fa-calendar me-1"></i> {{ hotMovie.year }}</span>
              <span><i class="fa-solid fa-clock me-1"></i> {{ hotMovie.duration }}</span>
            </div>
            <h5 class="fw-bold text-primary mb-3"><i class="fa-solid fa-circle-info me-2"></i>Nội dung:</h5>
            <div class="text-secondary fs-5 lh-lg" v-html="hotMovie.description"></div>
            <div class="d-flex gap-2 mt-4">
              <button class="btn btn-primary rounded-pill px-5 fw-bold py-2 shadow" @click="viewMovie(hotMovie)">
                <i class="fa-solid fa-play me-2"></i>XEM NGAY
              </button>
              <button class="btn btn-outline-secondary rounded-circle p-3" @click="saveToWatchList(hotMovie)">
                <i class="fa-solid fa-bookmark"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-5">
        <div class="d-flex justify-content-between align-items-center mb-4 border-start border-primary border-4 ps-3">
          <h3 class="fw-bold text-dark mb-0">PHIM MỚI CẬP NHẬT</h3>
        </div>
        <div class="row g-4">
          <div v-if="movies.length === 0" class="col-12 text-center text-muted py-5">
            Chưa có phim mới nào được đăng. Hãy vào trang "Đăng phim"!
          </div>
          <div v-for="(movie, index) in movies" :key="index" class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden movie-card">
              <div class="position-relative">
                <img :src="movie.image" class="card-img-top" style="height: 320px; object-fit: cover;">
                <button @click="deleteMovie(index)" class="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div class="card-body">
                <h6 class="fw-bold text-dark text-truncate">{{ movie.title }}</h6>
                <p class="small text-muted mb-3">Hành động, Phiêu lưu</p>
                <div class="d-grid gap-2">
                  <button @click="viewMovie(movie)" class="btn btn-primary btn-sm rounded-pill">Xem phim</button>
                  <button @click="saveToWatchList(movie)" class="btn btn-outline-warning btn-sm rounded-pill text-dark">Lưu danh sách</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// --- DATA (Những thông tin hiển thị trên màn hình) ---
const isLoggedIn = ref(null);
const movies = ref([]);

// Menu cho Navbar
const menuItems = ref([
  { text: 'Trang chủ', path: 'index.html', icon: 'fa-solid fa-house', active: true },
  { text: 'Đăng phim', path: 'DangPhim.html', icon: 'fa-solid fa-cloud-arrow-up', active: false },
  { text: 'Bình luận', path: 'BinhLuan.html', icon: 'fa-solid fa-comments', active: false },
  { text: 'Giới thiệu', path: 'GioiThieu.html', icon: 'fa-solid fa-address-card', active: false },
  { text: 'Danh sách', path: 'DanhSach.html', icon: 'fa-solid fa-list', active: false },
]);

// Thông tin Phim Hot đầu trang
const hotMovie = ref({
  title: "Người Nhện: Không Còn Nhà",
  rating: "8.2/10",
  year: "2021",
  duration: "148 phút",
  image: "/images/SpiderMan.jpg",
  description: "<p>Phim kể về hành trình Peter Parker giải quyết hậu quả của việc lộ danh tính...</p>"
});

// --- LOGIC (Các hàm xử lý) ---
onMounted(() => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn');
  // Lấy dữ liệu phim từ localStorage (nơi trang DangPhim.vue lưu vào)
  const savedMovies = JSON.parse(localStorage.getItem('userMovies')) || [];
  movies.value = savedMovies;
});

const logout = () => {
  localStorage.removeItem('isLoggedIn');
  isLoggedIn.value = null;
  location.reload();
};

const deleteMovie = (index) => {
  if (confirm("Xóa phim này khỏi hệ thống?")) {
    movies.value.splice(index, 1);
    localStorage.setItem('userMovies', JSON.stringify(movies.value));
  }
};

const saveToWatchList = (movie) => {
  let list = JSON.parse(localStorage.getItem('myWatchList')) || [];
  if (!list.some(m => m.title === movie.title)) {
    list.push({ title: movie.title, image: movie.image });
    localStorage.setItem('myWatchList', JSON.stringify(list));
    alert("Đã lưu vào Danh sách phim yêu thích!");
  }
};

const viewMovie = (movie) => {
  sessionStorage.setItem('selectedMovie', JSON.stringify(movie));
  window.location.href = 'BinhLuan.html';
};
</script>

<style scoped>
/* CSS cho hiệu ứng đẹp hơn index.html cũ */
.movie-card { transition: all 0.3s ease; }
.movie-card:hover { transform: translateY(-8px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
</style>