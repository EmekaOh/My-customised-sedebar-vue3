<template>
  <RouterView />
</template>

<script>
import { onMounted } from 'vue';

export default {
  setup() {

    onMounted(() => {
    });

    // Return any data, computed properties, or methods that your component needs
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

table {
  font-family: "Roboto", sans-serif;
}

/* Customized Scrollbar */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}

::-webkit-scrollbar-thumb {
  background: #1F2937;
  border: 0px none #1F2937;
  border-radius: 0px;
}

::-webkit-scrollbar-thumb:hover {
  background: #1F2937;
}

::-webkit-scrollbar-thumb:active {
  background: #1F2937;
}

::-webkit-scrollbar-track {
  background: #f5f7fa;
  border: 0px none #f5f7fa;
  border-radius: 0px;
}

::-webkit-scrollbar-track:hover {
  background: #f5f7fa;
}

::-webkit-scrollbar-track:active {
  background: #f5f7fa;
}

::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
