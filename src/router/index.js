import { createWebHistory, createRouter } from "vue-router";
import { useLoginStore } from "/src/components/stores/loginStore.js";

import LoginPage from "/src/components/login/templates/LoginPage.vue";
import ForgotPassPage from "/src/components/forgotpassword/templates/ForgotPassPage.vue";
import DashboardPage from "/src/components/dashboardpage/templates/DashboardPage.vue";
import ClubsPage from "/src/components/clubspage/templates/ClubsPage.vue";
import TrainersPage from "/src/components/trainerspage/templates/TrainersPage.vue";
import PlayersPage from "/src/components/playerspage/templates/PlayersPage.vue";
import HashtagsPage from "/src/components/hashtagspage/templates/HashtagsPage.vue";
import CourtsPage from "/src/components/courtspage/templates/CourtsPage.vue";
import TrainingsPage from "/src/components/trainingspage/templates/TrainingsPage.vue";
import ProfilePage from "/src/components/profilepage/templates/ProfilePage.vue";
import NotFoundPage from "/src/components/404page/templates/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    component: LoginPage,
  },

  {
    path: "/login",
    component: LoginPage,
  },

  {
    path: "/forgot-password",
    component: ForgotPassPage,
  },

  {
    path: "/dashboard",
    component: DashboardPage,
    meta: { requiresLogin: true },
  },

  {
    path: "/clubs",
    component: ClubsPage,
    meta: { requiresLogin: true },
  },

  {
    path: "/trainers",
    component: TrainersPage,
    meta: { requiresLogin: true },
  },

  {
    path: "/players",
    component: PlayersPage,
    meta: { requiresLogin: true },
  },

  {
    path: "/hashtags",
    component: HashtagsPage,
    meta: { requiresLogin: true },
  },

  {
    path: "/courts",
    component: CourtsPage,
    meta: { requiresLogin: true },
  },

  {
    path: "/trainings",
    component: TrainingsPage,
    meta: { requiresLogin: true },
  },

  {
    path: "/profile",
    component: ProfilePage,
    meta: { requiresLogin: true },
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundPage,
    meta: { requiresLogin: true },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loginStore = useLoginStore();

  if (to.meta.requiresLogin && !loginStore.isLoggedIn) {
    next("/login");
  } else if (
    (to.path === "/login" || to.path === "/") &&
    loginStore.isLoggedIn
  ) {
    next("/dashboard");
  } else {
    next();
  }
});
