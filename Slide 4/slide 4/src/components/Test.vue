<template>
    <div>
    Number: {{ count }}
    <button @click="increment">Add</button>
    <button @click="reset">Reset</button>
</div>
</template>
<script>
export default {
    data() {
        return {
            count: 0
        };
    },
    methods: {
        increment() {
            this.count++;// Dùng this để truy cập biến trong data
        },
        reset() {
            this.count = 0; //đặt lại count về 0
        }
    }
};
</script>