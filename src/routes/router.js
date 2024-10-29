
import { createRouter, createWebHistory }  from 'vue-router';
import TikTokStream from "../components/TikTokStream.vue";
import SearchView from '../components/TikTokSearch.vue';

const routes = [
    {
        path: '/',
        name: 'TikTokStream',
        component: TikTokStream,
    },
    {
        path:'/search/:query',
        name: 'SearchResults',
        component: SearchView,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
