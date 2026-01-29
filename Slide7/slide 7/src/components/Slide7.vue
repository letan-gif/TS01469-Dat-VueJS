<template>
    <div class="container">
       <h1 @click.left="handleClick">Slide7</h1>
       <input type="" value="" v-on:keyup.enter="submit" placeholder="Nhập" v-on:keyup.ctrl="handleClick"/>
    </div>
</template>

<script setup>
import {ref} from 'vue'
const myName = ref('')
const handleClick = () => {
alert(myName.value);
};
</script>