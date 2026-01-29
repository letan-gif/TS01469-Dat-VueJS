<template>
    <h2>Danh sách sản phẩm</h2>
    <div class="container">
        <div v-for="(post, index) in posts" :key="index" :class="{ 'highlighted': post.name && post.name.length > 20 }"
            class="post">
            <h3 class="text-success">{{ post.name }}</h3>
            <p class="text-danger">{{ post.description }}</p>
            <p class="price">{{ formatPrice(post.price) }}</p>
        </div>
    </div>
</template>

<script setup>
// THÊM defineProps ở đây
const props = defineProps({
    posts: {
        type: Array,
        required: true,
        default: () => []
    }
})

// Hàm định dạng giá (giữ bên trong setup)
function formatPrice(price) {
    if (!price) return '0 ₫'
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price)
}
</script>

<style>
.container {
    border: 1px solid #999;
    margin: 10px;
    padding: 2px;
    display: block;
    border-radius: 10px;
}

.post {
    padding: 20px;
    margin: 10px 0;
    border: 1px soild #ddd;
    border-radius: 10px;
}

.hightlighted {
    border: 2px soild lightgray;
}
</style>