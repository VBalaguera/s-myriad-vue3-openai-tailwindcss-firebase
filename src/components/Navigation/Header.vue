<template>
  <header
    class="header border-b-2 border-zinc-600 pb-2 flex justify-between items-center mb-4"
  >
    <router-link :to="{ name: 'Home' }"
      ><h1 class="font-semibold text-3xl mb-2">{{ title }}</h1></router-link
    >

    <div class="header-links flex">
      <div v-if="user">
        <router-link class="mb-2 mr-2" :to="{ name: 'Notes' }"
          >Notes</router-link
        >
        <router-link class="mb-2 mr-2" :to="{ name: 'AIPage' }">AI</router-link>
        <router-link class="mb-2 mr-2" :to="{ name: 'AIResults' }"
          >AI results</router-link
        >

        <button class="mb-2 mr-2" @click="logout">Logout</button>
      </div>

      <div v-else>
        <router-link class="mr-2" :to="{ name: 'Login' }">Login</router-link>
        <router-link class="mr-2" :to="{ name: 'Signup' }">Sign Up</router-link>
      </div>
      <router-link :to="{ name: 'About' }">About</router-link>
    </div>
  </header>
</template>

<script>
import Button from '../Button/Button.vue'

export default {
  name: 'Header',
  props: {
    title: { type: String, default: 'Sup' },
  },
  components: {
    Button,
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => alert('Goodbye'))
    },
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
}
</script>

<style scoped>
@media screen and (max-width: 992px) {
  header {
    flex-direction: column;
  }
  .header-links button,
  .header-links a {
    margin: 0 0.5rem 0 0.5rem;
  }

  .header-links {
    font-size: 0.8rem;
  }
}
</style>
