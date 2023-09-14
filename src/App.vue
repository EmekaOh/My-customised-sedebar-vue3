<template>
  <RouterView />
</template>

<script>
import { onMounted } from 'vue';

export default {
  components: {
  },
  setup() {

    onMounted(() => {
    });

    return {
      // ...
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&family=Roboto&display=swap");

body {
  font-family: "Montserrat", sans-serif;
  background-color: #f5f7fa;
  height: 100vh;
}
</style>
