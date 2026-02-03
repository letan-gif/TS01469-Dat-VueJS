import { createRouter, createWebHistory } from 'vue-router'

// Sử dụng đường dẫn tương đối từ src/router/index.js sang src/views/
// import StoryListView from '../views/StoryListView.vue'
import StoryListView from '../views/StoryListView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import AddStoryView from '../views/AddStoryView.vue'
import ReadStoryView from '../views/ReadStoryView.vue'
import AddChapterView from '../views/AddChapterView.vue'
import ReadChapterView from '../views/ReadChapterView.vue'
import ChapterListView from '../views/ChapterListView.vue'
import CommentView from '../views/CommentView.vue'

const routes = [
  { path: '/', component: StoryListView, name: 'home' },
  { path: '/login', component: LoginView, name: 'login' },
  { path: '/register', component: RegisterView, name: 'register' },
  { path: '/profile', component: ProfileView, name: 'profile' },
  { path: '/add-story', component: AddStoryView, name: 'add-story' },
  { path: '/story/:id', component: ReadStoryView, props: true, name: 'read-story' },
  { path: '/story/:id/add-chapter', component: AddChapterView, props: true, name: 'add-chapter' },
  { path: '/story/:id/chapter/:chapterIndex', component: ReadChapterView, props: true, name: 'read-chapter' },
  { path: '/chapters', component: ChapterListView, name: 'chapters' },
  { path: '/comments', component: CommentView, name: 'comments' },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router