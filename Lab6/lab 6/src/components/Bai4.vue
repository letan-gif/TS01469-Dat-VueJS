<template>
    <div class="container mt-5">
        <div class="row">
            <!--Phần form-->
            <div class="col-sm-4">
                <form @submit.prevent="submitForm">
                    <h3>Thêm học sinh</h3>
                    <div class="mb-3 mt-3">
                        <label for="name">Họ tên:</label>
                        <input type="text" class="form-control" v-model="student.name" id="name" required />
                    </div>

                    <div class="mb-3">
                        <label for="score">Điểm</label>
                        <input type="number" max="10" min="0" class="form-control" v-model="student.score" id="score" 
                        required/>
                    </div>

                    <div class="mb-3">
                        <label for="dob">Ngày sinh:</label>
                        <input type="date" class="form-control" v-model="student.dob" id="dob" required />
                    </div>

                    <button type="submit" class="btn btn-success">{{ isEditing ? 'Cập nhật' : 'Thêm' }}</button>
                    <button type="button" v-if="isEditing" class="btn btn-secondary ms-2" @click="cancelEdit">Hủy</button>
                </form>
            </div>

            <!--Phần danh sách-->
            <div class="col-sm-8">
                <h3>Danh sách học sinh</h3>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Họ và tên</th>
                            <th>Điểm</th>
                            <th>Ngày sinh</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(stu, index) in students" :key="index">
                            <td>{{ stu.name }}</td>
                            <td>{{ stu.score }}</td>
                            <td>{{ formatDate(stu.dob) }}</td>
                            <td>
                                <button class="btn btn-warning btn-sm me-2" @click="editStudent(index)">Sửa</button>
                                <button class="btn btn-danger btn-sm" @click="deleteStudent(index)">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// Dữ liệu mẫu ban đầu
const students = ref([
    { name: 'Nguyễn Chí Hùng', score: 8, dob: '2006-01-01' },
    { name: 'Phạm Thị Lan', score: 9, dob: '2006-05-15' }
])

// Biến quản lý trạng thái student
const student = ref({
    name: '',
    score: '',
    dob: '',
})

let isEditing = ref(false)
let editingIndex = ref(null)

function submitForm() {
    if (isEditing.value) {
        // Cập nhật thông tin học sinh
        students.value[editingIndex.value] = { ...student.value }
        isEditing.value = false
        editingIndex.value = null
    } else {
        // Thêm học sinh mới
        students.value.push({ ...student.value })
    }
    resetForm()
}

function editStudent(index) {
    student.value = { ...students.value[index] }
    isEditing.value = true
    editingIndex.value = index
}

function deleteStudent(index) {
    if (confirm('Bạn có chắc chắn muốn xóa học sinh này?')) {
        students.value.splice(index, 1)
        
        // Nếu đang chỉnh sửa học sinh bị xóa, hủy chỉnh sửa
        if (isEditing.value && editingIndex.value === index) {
            cancelEdit()
        }
    }
}

function cancelEdit() {
    isEditing.value = false
    editingIndex.value = null
    resetForm()
}

function resetForm() {
    student.value = {
        name: '',
        score: '',
        dob: '',
    }
}

function formatDate(dateString) {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN')
}
</script>

<style scoped>
.btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
}
</style>