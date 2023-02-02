<template>
  <div class="h-full min-h-[80vh]">
    <form action="" class="mb-2">
      <h2 class="font-semibold text-2xl">Login</h2>
      <div class="form">
        <div class="flex flex-col w-full mb-2">
          <div class="my-2 mx-0">
            <input
              class="w-full md:w-3/4 py-2 px-4"
              type="text"
              placeholder="Your email"
              v-model="login_form.email"
            />
          </div>
          <div class="my-2 mx-0">
            <input
              class="w-full md:w-3/4 py-2 px-4"
              type="password"
              placeholder="Your password"
              v-model="login_form.password"
            />
          </div>
        </div>
        <button class="underline" @click.prevent="login">Login</button>
      </div>
    </form>
    <div class="-bottom">
      <p class="my-2 mx-0">
        Don't have an account yet?
        <router-link class="underline" :to="{ name: 'Signup' }"
          >Sign up.</router-link
        >
      </p>
      <router-link class="underline" to="/forgot-password">
        Forgot Password?</router-link
      >
    </div>
    <Modal v-if="modalActive" v-on:close-modal="closeModal" />
    <div v-show="error">{{ this.errorMsg }}</div>
  </div>
</template>

<script>
import Modal from '@/components/Modal/Modal.vue'

import { useStore } from 'vuex'
import { ref } from 'vue'
export default {
  name: 'Login',
  components: { Modal },
  data() {
    return {
      modalActive: null,
      modalMessage: '',
      error: null,
      errorMsg: '',
    }
  },
  methods: {
    closeModal() {
      this.modalActive = !this.modalActive
      this.email = ''
    },
  },
  setup() {
    const login_form = ref({})
    const store = useStore()
    const login = () => {
      store
        .dispatch('login', login_form.value)
        .then(() => alert('Welcome back'))
    }
    return {
      login_form,

      login,
    }
  },
}
</script>

<style></style>
