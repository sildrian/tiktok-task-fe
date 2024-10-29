<template>
  <div class="tiktok">
    <video :src="video" ref="vidRef" autoplay :muted="state.isMuted" @click="togglePlay" />
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
    <div class="">
      <div class="options-icon" @click="toggleOptionsMenu">
        <i class="bi bi-three-dots-vertical" style="color: white;font-size: 40px;"></i>
      </div>
      <div v-if="showOptionsMenu" class="popup-menu">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="mySwitch" v-model="autoSwitchEnabled" name="darkmode" @click="toggleAutoSwitch">
          <label class="form-check-label" for="mySwitch">{{ autoSwitchEnabled ? 'Enable' : 'Disable' }} Auto Switch</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, watch } from "vue";

export default defineComponent({
  name: "tiktok",
  props: {
    video: String,
    index_video: Number,
    autoSwitchEnabled: Boolean
  },
  emits: ['updateSwitchItem'],
  setup(props, { emit }) {
    const vidRef = ref(null);
    const indexVideo = ref(props.index_video)
    const showOptionsMenu = ref(false);
    const state = reactive({
      playing: false,
      isMuted: true
    });

    const toggleAutoSwitch = () => {
        emit('updateSwitchItem', !props.autoSwitchEnabled);
    };

    const toggleOptionsMenu = () => {
      showOptionsMenu.value = !showOptionsMenu.value;
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

    return {
      vidRef,
      play,
      pause,
      togglePlay,
      toggleMute,
      muteHandler,
      unmuteHandler,
      state,
      toggleAutoSwitch,
      showOptionsMenu,
      toggleOptionsMenu
    };
  },
});
</script>

<style scoped>
.tiktok {
  position: relative;
  width: 100%;
  height: 100%;
}

video {
  aspect-ratio: 348/520;
  width: 100%;
  height: auto;
  position: relative;
}

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
  bottom: 25px;
  right: 80px;
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
.options-icon {
  position: absolute;
  top: 80px;
  right: 80px;
  z-index: 1000;
  font-size: 1.5rem; /* Adjust size as needed */
  cursor: pointer;
}
.popup-menu {
  position: absolute;
  padding: 1rem;
  top: 140px;
  right: -33px;
  transform: translateX(-50%);
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
</style>
