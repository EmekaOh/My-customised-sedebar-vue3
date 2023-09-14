<template>
  <div class="">
    <div class="sidebar h-screen w-screen" :class="{ 'sidebar-open border-r border-white': isToggled, 'hidden': !isToggled }">
      <!-- <p>Toggle Status: {{ isToggled }}</p> -->
      <!-- <button @click="toggle">Toggle</button> -->
      <button @click="toggleSidebar" class="flex justify-end w-full">
        <font-awesome-icon class="p-2 bg-white text-[#333]" icon="xmark" />
      </button>
      <ul class="mt-4">
        <li class="border-b border-white p-2 hover:bg-white hover:text-[#333] border-[#333] cursor-pointer">
          <router-link to="/">Home</router-link>
        </li>
        <li class="border-b border-white p-2 hover:bg-white hover:text-[#333] border-[#333] cursor-pointer">
          <router-link to="/about">About</router-link>
        </li>
        <li class="border-b border-white p-2 hover:bg-white hover:text-[#333] border-[#333] cursor-pointer">
          <router-link to="/contact">Contact</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { ref } from 'vue';

export default {
  name: 'SideBar',
  props: {
    isToggled: Boolean,
  },
  setup(props, { emit }) {

    const toggle = () => {
      emit('toggle');
    };

    return {
      toggle,
    };
  },
};
</script>

<style>
.sidebar {
  width: 250px;
  background-color: #333;
  color: white;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
  /* Add a transition for smooth open/close */
  transform: translateX(-250px);
  /* Initially off-screen */
}

.sidebar-open {
  transform: translateX(0);
  /* Display when open */
}
</style>