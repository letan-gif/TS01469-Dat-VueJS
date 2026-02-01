import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import BlogList from "../views/BlogList.vue";
import BlogPost from "../views/BlogPost.vue";
import UserProfile from "../views/UserProfile.vue";
import UserProfileInfo from "../views/UserProfileInfo.vue";
import UserProfileSettings from "../views/UserProfileSettings.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";


const isAuthenticated = true; 

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/blog", name: "BlogList", component: BlogList },
  { path: "/blog/:id", name: "BlogPost", component: BlogPost }, 
  { 
    path: "/profile", 
    name: "UserProfile", 
    component: UserProfile,
    alias: "/me", // Alias route [cite: 46, 89]
    children: [ // Routes lồng nhau [cite: 31, 91]
      { path: "info", name: "UserProfileInfo", component: UserProfileInfo },
      { path: "settings", name: "UserProfileSettings", component: UserProfileSettings }
    ]
  },
  { path: "/login", name: "Login", component: Login },
  { 
    path: "/dashboard", 
    name: "Dashboard", 
    component: Dashboard,
    meta: { requiresAuth: true } // Đánh dấu route cần bảo vệ [cite: 117]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route Guard để bảo mật [cite: 41, 130]
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: "Login" }); // Chuyển hướng về Login nếu chưa đăng nhập [cite: 41, 145]
  } else {
    next();
  }
});

export default router;