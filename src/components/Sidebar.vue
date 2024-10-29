<template>
    <div class="sidebar">
        <div class="sidebar-item" v-for="item in sidebarItems" :key="item.name">
            <i :class="[item.icon,'fs-1']" :style="{ color: 'red' }"></i> <span class="fs-3" :style="{ color: 'red', marginLeft: '10px', fontWeight: 'bold' }">{{ item.name }}</span>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Sidebar',
    data() {
        return {
            sidebarItems: [
                { name: 'For You', icon: 'bi-house-fill' }
            ]
        }
    }
})
</script>

<style scoped>
    .sidebar {
        height: 100vh;
        position: fixed;
        top: 50px;
        left: 0;
        width: 250px;
        background-color: #fff;
        border-right: 1px solid #ddd;
        padding-top: 20px;
        z-index: -1000;
    }
    .sidebar-item {
        padding: 10px 20px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .sidebar-item:hover {
        background-color: #f0f0f0;
    }
    .content {
        margin-left: 250px;
        padding: 20px;
    }
</style>