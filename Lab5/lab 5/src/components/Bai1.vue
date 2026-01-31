<template>
    <div class="p-5">
        <p>{{ message }}</p>
        <button class="btn btn-dark" @click="updateMessage">Thay đổi thông điệp</button>
        <br>
        <br>
        <div class="mb-3">
            <label>Số lượng:</label>
            <input v-model.number="number" class="form-control" type="number" />
        </div>

        <div class="mb-3">
            <label>Giá:</label>
            <input v-model.number="price" class="form-control" type="number" />
        </div>

        <div class="alert alert-info">
            <strong>Tổng tiền:</strong> {{ total.toLocaleString() }} VND
        </div>

        <button class="btn btn-success" @click="submitTotal">Thanh toán</button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const message = ref('Thông điệp ban đầu');
const price = ref(0);
const number = ref(0);
const updateMessage = () => {
    message.value = 'Thông tin đã được thay đổi!';
};
// Sử dụng computed để tự động tính toán khi number hoặc price thay đổi
const total = computed(() => {
    return number.value * price.value;
});

const submitTotal = () => {
    alert(`Bạn cần thanh toán: ${total.value} VND`);
};
</script>