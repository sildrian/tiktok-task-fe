<template>
  <Header />
  <Sidebar />
  <div
    class="tiktok-stream"
    ref="tiktokStream"
    v-swipe="onSwipe"
    :style="state.style"
  >
    <tiktok
      v-for="(tiktok, i) in tiktokData"
      :video="tiktok.video"
      :key="tiktok.id"
      :index_video="i"
      :ref="
        (el) => {
          tiktokRefs[i] = el;
        }
      "
      :autoSwitchEnabled="switchItem"
      @updateSwitchItem="handleUpdateSwitchItem"
    />
    <div class="p-4">
      <p class="text-gray-700">Video description or other content goes here.</p>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  onBeforeUpdate,
  onMounted,
} from "vue";

import swipe from "../directives/swipe.js";
import Tiktok from "./Tiktok.vue";
import TiktoksJson from "../tiktoks.json";
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";
import {GetService_} from '../services/get/get_service.js'
export default defineComponent({
  name: "TikTokStream",
  directives: {
    swipe,
  },
  components: {
    Tiktok,
    Header,
    Sidebar,
  },
  setup() {
    const tiktokStream = ref(null);
    const tiktokRefs = ref([]);
    // const tiktokData = TiktoksJson;
    const tiktokData = ref([]);
    const switchItem = ref(false);

    const state = reactive({
      currentSlide: 1,
      amoundOfSlides: 0,
      style: {
        transform: computed(
          () => `translate3d(50px, ${-(state.currentSlide - 1) * 100}%, 0)`
        ),
      },
    });

    onBeforeUpdate(() => {
      tiktokRefs.value = [];
    });

    onMounted(() => {
      fetchData()
    });

    watch(
      () => state.currentSlide,
      (items, oldItems) => {
        tiktokRefs.value[items - 1].play();
        tiktokRefs.value[items - 1].unmuteHandler();
        tiktokRefs.value[oldItems - 1].pause();
        if(switchItem.value){
          handleUpdateSwitchItem(switchItem.value)
        }
      },
      {
        lazy: false,
      }
    );

    const onSwipe = (direction) => {
      if (
        (direction === 1 && state.currentSlide === state.amoundOfSlides) ||
        (direction === -1 && state.currentSlide === 1)
      ) {
        return;
      }
      state.currentSlide += direction;
    };

    const handleUpdateSwitchItem = (value) => {
      switchItem.value = value;
      if(value){
        setTimeout(() => {
          if (
            (state.currentSlide === state.amoundOfSlides)
          ) {
            return;
          }
          state.currentSlide += 1
        }, 5000);
      }
    };

    const fetchData = async () => {
      try {
        let q = {
          url: '/api/go/get-video',
          params: ''
        }
        tiktokData.value = await GetService_(q).then((res) => res.data.data)
        // tiktokRefs.value[state.currentSlide - 1].play();
        state.amoundOfSlides = tiktokData.value.length
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };

    return {
      state,
      onSwipe,
      tiktokStream,
      tiktokData,
      tiktokRefs,
      handleUpdateSwitchItem,
      switchItem,
    };
  },
});
</script>

<style>
.tiktok-stream {
  position: relative;
  height: 100%;
  width: 50%;
  margin: auto;
  padding: 0;
  transform: translate3d(0, 0, 0);
  transition: transform 200ms ease;
}
</style>
