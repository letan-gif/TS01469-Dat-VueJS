<script setup>
import { ref } from 'vue'

import HeaderComponent from './components/HeaderComponent.vue'
import LoginComponent from './components/LoginComponent.vue'
import RegisterComponent from './components/RegisterComponent.vue'
import StoryListComponent from './components/StoryListComponent.vue'
import AddStoryComponent from './components/AddStoryComponent.vue'
import AddChapterComponent from './components/AddChapterComponent.vue'
import ReadStoryComponent from './components/ReadStoryComponent.vue'
import ReadChapterComponent from './components/ReadChapterComponent.vue'
import ProfileComponent from './components/ProfileComponent.vue'

const currentView = ref('login')
const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))
const currentStory = ref(null)
const currentChapter = ref(null)

const changeView = (v) => currentView.value = v

const loginSuccess = () => {
  currentUser.value = JSON.parse(localStorage.getItem('currentUser'))
  currentView.value = 'list'
}

const logout = () => {
  localStorage.removeItem('currentUser')
  currentUser.value = null
  currentView.value = 'login'
}

const readStory = (story) => {
  currentStory.value = story
  currentView.value = 'read'
}

const addChapter = (story) => {
  currentStory.value = story
  currentView.value = 'addChapter'
}

const readChapter = (chapter) => {
  currentChapter.value = chapter
  currentView.value = 'readChapter'
}
</script>

<template>
  <HeaderComponent
    :user="currentUser"
    @go-home="changeView('list')"
    @go-list="changeView('list')"
    @go-login="changeView('login')"
    @go-register="changeView('register')"
    @go-add="changeView('addStory')"
    @go-profile="changeView('profile')"
    @logout="logout"
  />

  <div class="container mt-4">
    <LoginComponent v-if="currentView === 'login'" @login-success="loginSuccess" />
    <RegisterComponent v-if="currentView === 'register'" @register-success="changeView('login')" />

    <StoryListComponent
      v-if="currentView === 'list'"
      @read-story="readStory"
    />

    <AddStoryComponent v-if="currentView === 'addStory' && currentUser" />

    <ReadStoryComponent
      v-if="currentView === 'read'"
      :story="currentStory"
      :user="currentUser"
      @add-chapter="addChapter"
      @read-chapter="readChapter"
    />

    <AddChapterComponent
      v-if="currentView === 'addChapter'"
      :story="currentStory"
      @done="changeView('read')"
    />

    <ReadChapterComponent
      v-if="currentView === 'readChapter'"
      :chapter="currentChapter"
      :user="currentUser"
      @back="changeView('read')"
    />

    <ProfileComponent v-if="currentView === 'profile' && currentUser" />
  </div>
</template>