<template>
  <div class="h-full min-h-[80vh]">
    <form action="" class="mb-2">
      <h2 class="font-semibold text-2xl">Create your account</h2>
      <div>
        <div class="flex flex-col w-full mb-2">
          <div class="my-2 mx-0">
            <input
              class="w-full md:w-3/4 py-2 px-4"
              type="text"
              placeholder="Your email"
              v-model="register_form.email"
            />
          </div>
          <div class="my-2 mx-0">
            <input
              class="w-full md:w-3/4 py-2 px-4"
              type="password"
              placeholder="Your password"
              v-model="register_form.password"
            />
          </div>
          <div class="my-2 mx-0">
            <input
              class="w-full md:w-3/4 py-2 px-4"
              type="password"
              placeholder="Repeat password"
              v-model="register_form.repeat_password"
            />
          </div>
          <div v-show="error">{{ this.errorMsg }}</div>
        </div>
      </div>
      <button class="underline" @click.prevent="register">Sign up</button>
    </form>
    <p class="my-2 mx-0">
      Already have an account yet?
      <router-link class="underline" :to="{ name: 'Login' }"
        >Login.</router-link
      >
    </p>
  </div>
  <router-link class="underline" to="/">Back</router-link>
</template>

<script>
import 'firebase/auth'

import { useStore } from 'vuex'
import { ref } from 'vue'
export default {
  name: 'Signup',

  setup() {
    const register_form = ref({})
    const store = useStore()
    const register = () => {
      store
        .dispatch('register', register_form.value)
        .then(() => alert('Welcome to Myriad.'))
    }
    return {
      register_form,

      register,
    }
  },
}
</script>

<style lang="scss" scoped></style>
