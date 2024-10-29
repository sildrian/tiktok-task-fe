<template>
    <div class="">
        <header class="bg-white shadow-sm py-3">
            <div class="container d-flex align-items-center justify-content-between">
                <!-- Logo -->
                <img width="90" src="/images/tiktok-logo.png" alt="Logo" class="h-8">
    
                <!-- Search Bar -->
                <div class="position-relative w-50">
                    <input type="text" class="form-control search-input" v-model="searchQuery" placeholder="Search" @keyup.enter="fetchData">
                    <i class="bi bi-x-circle clear-icon" id="clearIcon" :style="{ display: showClearIcon ? 'block' : 'none' }" @click="clearSearch"></i>
                    <i class="bi bi-search search-icon"></i>
                </div>
    
                <!-- User Profile or Icons -->
                <div class="d-flex align-items-center">
                    <!-- <button class="btn btn-outline-primary me-2">Upload</button>
                    <img src="/images/user-avatar.png" alt="User Avatar" class="rounded-circle" width="40"> -->
                </div>
            </div>
        </header>
    </div>
</template>

<script>
import { ref, defineComponent, watch } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'Header',
    setup() {
        const searchQuery = ref('')
        const showClearIcon = ref(false)
        const router = useRouter();

        const clearSearch = () => {
            searchQuery.value = '';
            showClearIcon.value = false;
        }
        // Watch the searchQuery and update the visibility of the clear icon
        watch(searchQuery, (newValue) => {
            showClearIcon.value = newValue.length > 0;
        });
        // Function to fetch data from API
        const fetchData = async () => {
            if (searchQuery.value.trim() === '') return; // Avoid empty queries
            try {
                // const response = await fetch(`https://api.example.com/search?query=${searchQuery.value}`);
                // const data = await response.json();
                // console.log(data); // Handle the data as needed
                // router.push(`/${path}`);
                router.push({ name: 'SearchResults', params: { query: searchQuery.value } });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        return { searchQuery, clearSearch, showClearIcon, fetchData }
    }
})
</script>

<style scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000; /* High z-index to ensure it appears in front */
    background-color: white; /* Ensure header is white */
}
.search-input {
    border-radius: 50px;
    padding-left: 40px;
}
.search-icon, .clear-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
}
.search-icon {
    right: 10px;
}
.clear-icon {
    right: 48px;
    display: none; /* Initially hidden */
}
</style>

