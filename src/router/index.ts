import { createWebHistory, createRouter } from 'vue-router';

import LoginPage from '/src/components/login/templates/LoginPage.vue';
// import DashboardPage from '/src/components/dashboardpage/DashboardPage.vue';
import ClubsPage from '/src/components/clubspage/templates/ClubsPage.vue';
import TrainersPage from '/src/components/trainerspage/templates/TrainersPage.vue';
import PlayersPage from '/src/components/playerspage/templates/PlayersPage.vue';
import HashtagsPage from '/src/components/hashtagspage/templates/HashtagsPage.vue';
import CourtsPage from '/src/components/courtspage/templates/CourtsPage.vue';
import TrainingsPage from '/src/components/trainingspage/templates/TrainingsPage.vue';
import ProfilePage from '/src/components/profilepage/templates/ProfilePage.vue';

const routes = [

    {
        path: '/',
        component: LoginPage,
    },
    
    {
        path: '/login',
        component: LoginPage,
    },

    // {
    //     path: '/dashboard',
    //     component: DashboardPage,
    // },
    
    {
        path: '/clubs',
        component: ClubsPage,
    },

    {
        path: '/trainers',
        component: TrainersPage,
    },

    {
        path: '/players',
        component: PlayersPage,
    },

    {
        path: '/hashtags',
        component: HashtagsPage,
    },

    {
        path: '/courts',
        component: CourtsPage,
    },

    {
        path: '/trainings',
        component: TrainingsPage,
    },

    {
        path: '/profile',
        component: ProfilePage,
    },

];

export const router = createRouter({

  history: createWebHistory(),
  routes,
  
});