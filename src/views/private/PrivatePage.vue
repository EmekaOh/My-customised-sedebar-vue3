<template>
  <div class="flex flex-row">
    <sidebar :isToggled="isToggled" @click="toggle" />
    <div>
      <header class="h-[10vh] bg-[#333] text-white p-4">
        <button v-if="!isToggled" @click="toggle"><font-awesome-icon icon="sliders" /></button>
      </header>
      <main class="h-[80vh] w-screen flex justify-center items-center flex-col text-center">
        <RouterView class="w-full" />
        <h1 v-if="countdown > 0" class="text-red-600 font-bold text-2xl">Log Out In {{ formattedCountdown }}</h1>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Sidebar from '@/components/SideBar.vue'; // Import the Sidebar component

export default {
  components: {
    Sidebar
  },
  setup() {
    const isToggled = ref(false);

    const toggle = () => {
      isToggled.value = !isToggled.value;
    };

    onMounted(() => {
    });

    return {
      isToggled,
      toggle,
    };
  },
};
</script>

<style></style>
