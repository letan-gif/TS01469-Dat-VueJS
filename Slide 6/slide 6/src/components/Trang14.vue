<template>
<div class="container mt-4">
    <div class="card" style="width: 25rem;">
      <div class="card-header bg-primary text-white">
        <h2 class="card-title h5 mb-0">Top sách bán chạy</h2>
      </div>
      
      <ul class="list-group list-group-flush">
        <li v-for="(product, index) in products" :key="index" class="list-group-item">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">{{ product.name }}</h5>
            <span class="badge bg-success">{{ product.price.toLocaleString() }} VNĐ</span>
          </div>

          <button @click="toggleDetails(index)" class="btn btn-sm btn-info mt-2">
            {{ showDetails[index] ? "Ẩn chi tiết" : "Xem chi tiết" }}
          </button>

          <p v-show="showDetails[index]" class="mt-2 text-muted small">
            {{ product.description }}
          </p>
        </li>
      </ul>
    </div>
  </div>
    
</template>

<script setup>
import { ref } from 'vue';

const products = ref([
    {
        name: "Vợ Nhặt",
        description: "Tác phẩm 'Vợ Nhặt' của tác giả Kim Lân (1921-2007) khắc họa chân thực nạn đói năm 1945, qua đó ca ngợi tình người và khát vọng sống mãnh liệt của người nông dân.",
        price: 55000,
    },
    {
        name: "Chí Phèo",
        description: "Kiệt tác của Nam Cao viết về bi kịch bị tha hóa và khát vọng làm người lương thiện của người nông dân trong xã hội cũ. Một biểu tượng của văn học hiện thực.",
        price: 62000,
    },
    {
        name: "Lão Hạc",
        description: "Truyện ngắn đầy cảm động của Nam Cao về người nông dân nghèo khổ, trọng danh dự, chọn cái chết để bảo vệ tài sản cho con trai.",
        price: 48000,
    },
    {
        name: "Tắt Đèn",
        description: "Tiểu thuyết tiêu biểu của Ngô Tất Tố, phản ánh nỗi thống khổ của người nông dân dưới chế độ sưu thuế hà khắc và vẻ đẹp tâm hồn của nhân vật chị Dậu.",
        price: 75000,
    },
    {
        name: "Số Đỏ",
        description: "Tác phẩm trào phúng xuất sắc nhất của Vũ Trọng Phụng, phê phán sự lố lăng, kệch cỡm của xã hội thượng lưu 'u hóa' thời bấy giờ.",
        price: 89000,
    }
]);

// Trạng thái hiển thị chi tiết cho từng cuốn sách
const showDetails = ref(products.value.map(() => false));
// Phương thức để ẩn/hiển thị chi tiết sách
const toggleDetails = (index) => {
showDetails.value[index] = !showDetails.value[index];
};
</script>