<template>
  <div class="bg-light min-vh-100">
    <nav class="navbar navbar-expand-lg sticky-top shadow-sm border-bottom" style="background-color: #e3f2fd;">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img src="/Assignment 1/ASM1/src/assets/images/Logo-phim.png" alt="Logo" width="130">
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link px-3" href="/"><i class="fa-solid fa-house me-1"></i>Trang chủ</a></li>
            <li class="nav-item"><a class="nav-link px-3" href="/dang-phim"><i class="fa-solid fa-cloud-arrow-up me-1"></i>Đăng phim</a></li>
            <li class="nav-item"><a class="nav-link active fw-bold text-primary px-3" href="/danh-sach"><i class="fa-solid fa-bookmark me-1"></i>Danh sách</a></li>
          </ul>

          <div class="d-flex align-items-center">
            <template v-if="!user">
              <a href="/dang-ky" class="btn btn-white bg-white border rounded-pill px-4 me-2 shadow-sm">Đăng ký</a>
              <a href="/dang-nhap" class="btn btn-primary rounded-pill px-4 shadow-sm">Đăng nhập</a>
            </template>
            <div v-else class="dropdown">
              <button class="btn btn-outline-primary dropdown-toggle rounded-pill px-4 shadow-sm fw-bold" data-bs-toggle="dropdown">
                <i class="fa-solid fa-circle-user me-1"></i> {{ user }}
              </button>
              <ul class="dropdown-menu dropdown-menu-end border-0 shadow mt-2">
                <li><a class="dropdown-item" href="#">Thông tin cá nhân</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger" href="#" @click="logout">Đăng xuất</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="container mt-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-primary"><i class="fa-solid fa-bookmark me-2"></i>DANH SÁCH PHIM ĐÃ LƯU</h2>
        <span class="badge bg-primary rounded-pill fs-6 px-3 py-2">{{ myList.length }} Phim</span>
      </div>

      <div v-if="myList.length > 0" class="card shadow-sm border-0 rounded-3 overflow-hidden">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th class="ps-4 py-3 text-secondary">Phim</th>
                  <th class="text-secondary">Thể loại</th>
                  <th class="text-secondary">Trạng thái</th>
                  <th class="text-center text-secondary">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(movie, index) in myList" :key="index" class="animate-item">
                  <td class="ps-4 py-3">
                    <div class="d-flex align-items-center">
                      <img :src="movie.image" class="rounded shadow-sm me-3" 
                           style="width: 70px; height: 100px; object-fit: cover;">
                      <div>
                        <h6 class="fw-bold mb-0 text-dark">{{ movie.title }}</h6>
                        <small class="text-muted small">ID: #{{ index + 2024 }}</small>
                      </div>
                    </div>
                  </td>
                  <td><span class="badge bg-info text-dark rounded-pill px-3">Hành động</span></td>
                  <td><span class="text-success fw-bold small"><i class="fa-solid fa-circle-check me-1"></i>Đã lưu</span></td>
                  <td class="text-center">
                    <button @click="goDetail(movie)" class="btn btn-outline-primary btn-sm rounded-pill px-3 me-2">
                      <i class="fa-solid fa-eye me-1"></i> Xem
                    </button>
                    <button @click="deleteMovie(index)" class="btn btn-outline-danger btn-sm rounded-pill px-3">
                      <i class="fa-solid fa-trash-can me-1"></i> Xóa
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-else class="text-center mt-5 py-5 bg-white rounded-3 shadow-sm border">
        <i class="fa-solid fa-folder-open fa-5x text-muted mb-3" style="opacity: 0.3;"></i>
        <p class="fs-4 text-muted fw-bold">Danh sách của bạn đang trống.</p>
        <a href="/" class="btn btn-primary btn-lg rounded-pill px-5 shadow-sm">Khám phá phim ngay</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// --- STATE ---
const user = ref(null);
const myList = ref([]);

// --- LIFECYCLE ---
onMounted(() => {
  // Đồng bộ trạng thái đăng nhập
  user.value = localStorage.getItem('isLoggedIn');
  
  // Lấy danh sách phim đã lưu
  const savedData = localStorage.getItem('myWatchList');
  if (savedData) {
    myList.value = JSON.parse(savedData);
  }
});

// --- METHODS ---
const deleteMovie = (index) => {
  if (confirm("Bạn có chắc muốn xóa phim này khỏi danh sách?")) {
    // Xóa trong mảng (Vue sẽ tự động cập nhật giao diện)
    myList.value.splice(index, 1);
    // Cập nhật lại localStorage
    localStorage.setItem('myWatchList', JSON.stringify(myList.value));
  }
};

const goDetail = (movie) => {
  // Lưu phim đang chọn vào sessionStorage để trang BinhLuan.vue hiển thị
  sessionStorage.setItem('selectedMovie', JSON.stringify(movie));
  window.location.href = 'BinhLuan.html'; // Hoặc router.push if using Vue Router
};

const logout = () => {
  localStorage.removeItem('isLoggedIn');
  user.value = null;
  location.reload();
};
</script>

<style scoped>
.animate-item {
  transition: all 0.3s ease;
}
.table-hover tbody tr:hover {
  background-color: #f8fbff;
}
</style>