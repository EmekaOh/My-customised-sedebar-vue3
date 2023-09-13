<template>
  <div class="h-screen w-screen flex justify-center items-center flex-col text-center">
    <RouterView class="w-full" />
    <h1 class="text-red-600 font-bold text-5xl">Countdown: {{ formattedCountdown }}</h1>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { toolkitAxios } from "../../../env";

export default {
  components: {
  },
  setup() {
    const user = ref(null);
    const logoutTime = ref(new Date(new Date().setHours(new Date().getHours() + 2)));
    let countdown = ref(0);
    let isRefreshing = false; // Flag to track if a refresh is in progress

    const simulateUser = () => {
      user.value = { username: "JohnDoe" };
    };

    const refreshToken = async () => {
      isRefreshing = true;
      await toolkitAxios
        .post("auth/refresh")
        .then((response) => {
          console.log(new Date(response.data.data.expires_at))
          isRefreshing = false; // Reset the flag after the refresh
          logoutTime.value = new Date(response.data.data.expires_at)
        })
        .catch(() => {
          isRefreshing = false; // Reset the flag on error
        });
    };

    const logout = async () => {
      await toolkitAxios
        .post("auth/logout")
        .then(() => {
          console.log('Logged Out User')
          localStorage.clear();
          window.location.href = "/login";
        })
        .catch(() => {
        });
    };

    const updateCountdown = () => {
      const currentTime = new Date();
      const timeDifference = logoutTime.value - currentTime;

      if (timeDifference > 0) {
        countdown.value = timeDifference;
      } else {
        // Time has passed, trigger logout
        logout();
      }
    };

    // Compute a formatted countdown string
    const formattedCountdown = computed(() => {
      const hours = Math.floor(countdown.value / (1000 * 60 * 60));
      const minutes = Math.floor((countdown.value % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((countdown.value % (1000 * 60)) / 1000);

      return `${hours}:${minutes}:${seconds}`;
    });

    const onUserActive = () => {
      if (!user.value) {
        // User is not authenticated, skip token refresh
        return;
      }

      if (!isRefreshing) {
        refreshToken()
      }
    };

    onMounted(() => {
      simulateUser();
      // Start updating the countdown
      setInterval(updateCountdown, 1000);
      updateCountdown(); // Initial update

      // Listen for user activity events
      const activityEvents = ["mousemove", "keydown", "mousedown"];
      activityEvents.forEach((event) => {
        window.addEventListener(event, onUserActive);
      });
    });

    onUnmounted(() => {
      // Remove event listeners and clear intervals
      const activityEvents = ["mousemove", "keydown", "mousedown"];
      activityEvents.forEach((event) => {
        window.removeEventListener(event, onUserActive);
      });
    });

    return { user, countdown, formattedCountdown };
  },
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
