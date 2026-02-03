import { createWebHistory, createRouter } from 'vue-router';

import LoginPage from '/src/components/login/templates/LoginPage.vue';
import ClubsTemplate from '/src/components/clubspage/templates/ClubsTemplate.vue';
import DashboardPage from '/src/components/otherpages/DashboardPage.vue';
import TrainersPage from '/src/components/trainerpage/templates/TrainersPage.vue';
import PlayersPage from '/src/components/otherpages/PlayersPage.vue';
import HashtagsPage from '/src/components/otherpages/HashtagsPage.vue';
import CourtsPage from '/src/components/otherpages/CourtsPage.vue';
import TrainingsPage from '/src/components/otherpages/TrainingsPage.vue';
import ProfilePage from '/src/components/signoutpage/templates/ProfilePage.vue';

const routes = [
    
    {
        path: '/',
        component: LoginPage,
    },

    {
        path: '/dashboard',
        component: DashboardPage,
    },
    
    {
        path: '/clubs',
        component: ClubsTemplate,
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
    }

];

export const router = createRouter({

  history: createWebHistory(),
  routes,
  
})