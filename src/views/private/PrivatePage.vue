<template>
  <div class="h-screen w-screen flex justify-center items-center flex-col text-center">
    <RouterView class="w-full" />
    <h1 v-if="countdown > 0" class="text-red-600 font-bold text-2xl">Log Out In {{ formattedCountdown }}</h1>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { toolkitAxios } from "../../../env";

export default {
  components: {
  },
  setup() {
    const user = ref(null); // Represents the authenticated user
    // const refreshTokenInterval = 1000; // 1 second 
    // const refreshTokenInterval = 60000; // 1 minute
    // const refreshTokenInterval = 3600000; // 1 hour
    // const refreshTokenInterval = 7200000; // 2 hours
    const refreshTokenInterval = ref(60000);
    let inactivityTimer;
    let isRefreshing = false; // Flag to track if a refresh is in progress
    let countdown = ref(0);
    let refreshTokenExpireAt = ref(0);

    // Simulated user object for demonstration purposes
    const simulateUser = () => {
      user.value = { username: "JohnDoe" }; // Replace with your actual user data
    };

    const refreshToken = async () => {
      isRefreshing = true;
      await toolkitAxios
        .post("auth/refresh")
        .then((response) => {
          console.log(new Date(response.data.data.expires_at))
          isRefreshing = false; // Reset the flag after the refresh
          refreshTokenExpireAt.value = response.data.data.expires_at

          // Create two Date objects
          // const date1 = new Date(1694635597000); // Wed Sep 13 2023 12:15:00 GMT+0100 (British Summer Time)
          const date1 = new Date(refreshTokenExpireAt.value);
          const date2 = new Date(); // Wed Sep 13 2023 10:17:52 GMT+0100 (British Summer Time)

          // Calculate the time difference in milliseconds
          const timeDifference = date1 - date2;

          // Convert the time difference to hours
          const hoursDifference = (timeDifference / (1000 * 60 * 60)).toFixed(2);
          console.log(hoursDifference * 3600000) // Per 1 hour
          // refreshTokenInterval.value = hoursDifference * 3600000
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

    // Function to run when the user becomes active
    const onUserActive = () => {
      if (!user.value) {
        // User is not authenticated, skip token refresh
        return;
      }

      if (!isRefreshing) {
        refreshToken()
      }

      // Reset the inactivity timer on user activity
      clearTimeout(inactivityTimer);
      countdown.value = Math.floor(refreshTokenInterval.value / 1000); // Set countdown to initial value
      inactivityTimer = setTimeout(() => {
        logout(); // Log out the user after 1 minute of inactivity
      }, refreshTokenInterval.value);
    };

    // Initialize the user on component mount (replace with your actual auth logic)
    onMounted(() => {
      simulateUser();
    });

    // Listen for user activity events
    const activityEvents = ["mousemove", "keydown", "mousedown"];
    activityEvents.forEach((event) => {
      window.addEventListener(event, onUserActive);
    });

    // Update the countdown every second
    const countdownInterval = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value -= 1;
      }
    }, 1000);

    // Compute a formatted countdown string
    const formattedCountdown = computed(() => {
      const hours = Math.floor(countdown.value / 3600);
      const minutes = Math.floor((countdown.value % 3600) / 60);
      const seconds = countdown.value % 60;

      return `${hours}H : ${minutes}M : ${seconds}S`;
    });

    // Clean up event listeners on component unmount
    onUnmounted(() => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, onUserActive);
      });
      clearInterval(countdownInterval);
    });

    return { user, logout, countdown, formattedCountdown };
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
