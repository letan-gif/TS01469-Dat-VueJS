<template>
  <h2>Danh sách bài viết</h2>
  <div class="container">
    <div 
      v-for="(post, index) in posts" 
      :key="index" 
      :class="{ 'highlighted': post.title.length > 20 }"
      :style="{ backgroundColor: post.backgroundColor, color: post.textColor }" 
      class="post"
    >
      <h3 class="text-success">{{ post.title }}</h3>
      <h4 class="text-danger">{{ post.author }}</h4>
      <p>{{ post.content }}</p>
    </div>
    </div>
</template>

<script>
export default {
  name: "PostList",
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
};
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