<template>
  <div>
    <h2>Danh sách bài viết blog </h2>
    <ul>
      <li><router-link :to="{ name: 'BlogPost', params: { id: 101 }}">Bài viết số 101</router-link></li>
      <li><router-link :to="{ name: 'BlogPost', params: { id: 102 }}">Bài viết số 102</router-link></li>
    </ul>
  </div>
</template>