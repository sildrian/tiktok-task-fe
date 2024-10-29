<template>
    <Header />
    <div style="height: 100vh;" class="d-flex justify-content-center align-items-center">
        <div class="container">
            <div v-if="loading" class="text-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div v-if="!loading && searchResults.length === 0" class="text-center">
                <p>No results found.</p>
            </div>
            <div class="card-list">
                <div v-for="item in searchResults" :key="item.id" class="card">
                    <video :src="item.video" ref="vidRef" autoplay :muted="state.isMuted" @click="togglePlay" />
                    <svg
                        width="512"
                        height="512"
                        viewBox="0 0 512 512"
                        @click="togglePlay"
                        v-show="!state.playing"
                        >
                    <path d="M152.443 136.417l207.114 119.573-207.114 119.593z" fill="#fff" />
                    </svg>
                    <div class="volume-icon" @click="toggleMute">
                        <i :class="state.isMuted ? 'bi-volume-mute-fill' : 'bi-volume-up-fill'"></i>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ item.title }}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, defineComponent, watch, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import Header from "./Header.vue";
import TiktoksJson from "../tiktoks.json";
import {GetService_} from '../services/get/get_service.js'

export default defineComponent({
    name: 'TikTokSearch',
    components: {
        Header,
    },
    setup() {
        const searchResults = ref([]);
        const loading = ref(false);
        const route = useRoute();
        const query = route.params.query;
        const state = reactive({
            playing: false,
            isMuted: true
        });
        const vidRef = ref(null);

        onMounted(() => {
            fetchSearchResults();
        });

        watch(() => route.params.query, (newQuery) => {
            query = newQuery;
            fetchSearchResults();
        });

        const fetchSearchResults = async () => {
            loading.value = true;
            try {
                let tmpQuery = query.toLowerCase();
                let q = {
                    url: '/api/go/search-video',
                    params: {
                        'q': tmpQuery
                    }
                }
                let filteredTiktoks = await GetService_(q).then((res) => res.data.data)
                // let filteredTiktoks = TiktoksJson.filter(tiktok => tiktok.title.toLowerCase().includes(tmpQuery));
                searchResults.value = filteredTiktoks;
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                loading.value = false;
            }
        };

        const play = () => {
            vidRef.value.play();
            state.playing = true;
        };

        const pause = () => {
            vidRef.value.pause();
            state.playing = false;
        };

        const muteHandler = () => {
            state.isMuted = !state.isMuted;
            vidRef.value.muted = state.isMuted;
        };

        const unmuteHandler = () => {
            state.isMuted = false;
            vidRef.value.muted = false;
        };

        const togglePlay = () => {
            if (state.playing) {
                pause();
            } else {
                play();
            }
        };

        const toggleMute = () => {
            muteHandler();
        };

        return {searchResults, loading, fetchSearchResults, query, 
            state, vidRef, play, pause, togglePlay, toggleMute, muteHandler, unmuteHandler };
    }
})
</script>

<style scoped>
    svg {
        position: absolute;
        top: calc(50% - 35px);
        left: calc(50% - 35px);
        width: 90px;
        height: 90px;
        z-index: 10;
    }
    .volume-icon {
        position: absolute;
        bottom: 70px;
        right: 10px;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    .search-result {
        border-bottom: 1px solid #ddd;
        padding: 10px 0;
    }
    .search-result img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
    }
    .search-result .username {
        font-weight: bold;
    }
    .card-list {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }
    .card {
        width: 18rem;
        position: relative;
        height: 100%;
    }
    .card img {
        height: 200px;
        object-fit: cover;
    }
</style>
