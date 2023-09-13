<!-- NotFound.vue -->
<template>
  <div class="h-[80vh] w-screen flex justify-center items-center flex-col text-center">
    <h1 class="text-8xl font-bold text-indigo-700"><span class="text-9xl">O</span>OPS !</h1>
    <h1 class="my-4 text-5xl text-cyan-500">404 - Page Not Found</h1>
    <p class="text-gray-500">Sorry, the page you are looking for does not exist.</p>
    <router-link to="/" class="uppercase mt-8 text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 font-medium rounded-full text-sm px-10 py-2.5 text-center mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Go To Homepage</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
/* Add your custom styles for the 404 page here */
</style>
