<template>
  <main class="bg-lightColor h-screen lg:flex">
    <div class="hidden lg:block image-container relative bg-center bg-cover text-lightColor w-1/2">
      <h2 class="font-bold text-2xl absolute top-[44%] left-[75%] w-full text capitalize"></h2>
    </div>
    <div class="lg:w-1/2 flex flex-col justify-center items-center">
      <div role="status" :class="loading ? 'block absolute' : 'hidden'">
        <svg aria-hidden="true" class="w-16 h-16 mr-2 text-gray-200 animate-spin fill-gray-800" viewBox="0 0 100 101"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor" />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
      <div class="w-full mt-8" :class="loading ? 'opacity-50' : ''">
        <form class="md:w-9/12 lg:w-3/4 mx-auto p-8" @submit.prevent="onSubmit()">
          <div class="text-center mb-8">
            <div class="mb-10">
              <div
                class="text-lightColor bg-[#242424] w-28 h-28 mx-auto flex justify-center items-center rounded-full shadow-md">
                <font-awesome-icon class="text-[50px] text-[#f5f7fa]" icon="fa-user" />
              </div>
              <p class="text-[#242424] mt-1.5 font-bold text-3xl capitalize text-center">refresh timer with current time
                vue implementation</p>
            </div>
            <p class="text-[#242424] mt-1.5 font-bold text-start">Sign in</p>
          </div>
          <div class="relative z-0 w-full mb-8 group">
            <input type="email" name="floating_email" id="floating_email" v-model="state.email"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-800 peer"
              placeholder=" " required :disabled="loading" />
            <label for="floating_email"
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-800 peer-focus:dark:text-gray-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
              address</label>
          </div>
          <div class="relative z-0 w-full mb-2 group">
            <input type="password" name="floating_password" id="floating_password" v-model="state.password"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-800 peer"
              placeholder=" " required :disabled="loading" />
            <label for="floating_password"
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-800 peer-focus:dark:text-gray-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          </div>
          <a :href="loading ? null : 'https://servicedesk.armpension.com:800/'" class="text-sm font-medium text-gray-500"
            :class="loading ? '' : 'hover:text-gray-600 cursor-pointer'">
            Forgot Password? Contact IT
          </a>
          <button type="submit" :disabled="loading"
            class="mt-8 text-white bg-[#242424] font-medium text-sm w-full px-5 py-2.5 text-center"
            :class="loading ? 'cursor-not-allowed' : 'focus:ring-[#242424]  hover:bg-gray-600 focus:ring-4 focus:outline-none'">Submit</button>

          <div v-if="showErrorMsg" class="mt-3 text-red-700">
            <font-awesome-icon class="mr-2" icon="fa-exclamation-triangle" />
            {{ showErrorMsg }}
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { initAccordions } from 'flowbite'
import { onMounted, reactive } from "vue";
import { ref } from "@vue/reactivity";
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useStore } from "vuex";
import { toolkitAxios } from "../../../env";

export default {
  name: 'LoginPage',
  components: {},
  setup() {
    const showErrorMsg = ref(null);
    const loading = ref(false);
    const user = ref("");
    const store = useStore();

    const state = reactive({
      email: "",
      password: ""
    });

    const rules = {
      email: { required, email },
      password: { required },
    };

    const v$ = useVuelidate(rules, state);

    const onSubmit = async () => {
      v$.value.$touch();

      if (v$.value.$invalid) return;

      loading.value = true;

      await toolkitAxios
        .post("auth/login", {
          email: state.email,
          password: state.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.data.access_token);

          user.value = response.data.data;

          store.dispatch("getCurrentUser", user.value);
          store.dispatch("getUserToken", user.value);
          store.dispatch("getUserTokenExpiresAt", user.value);
          // window.location.href = "/";
          window.location.href = "/";
          // router.push('/')
        })
        .catch(() => {
        });
      loading.value = false;
    };

    onMounted(() => {
      initAccordions();

      if (localStorage.getItem("token") && localStorage.getItem("token") != undefined) {
        // router.push('/')
        window.location.href = "/";
      }
    });

    return {
      showErrorMsg,
      v$,
      state,
      onSubmit,
      loading,
      user,
    }
  },
};
</script>

<style>
header {
  display: none;
}
</style>

<style scoped>
.image-container {
  background-image: url('@/assets/IMG/login-bg.svg');
}

.text {
  transform: translate(-50%, -50%);
}
</style>