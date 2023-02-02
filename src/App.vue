<template>
  <div class="max-w-[1000px] min-h-[90vh] my-2 mx-auto overflow-auto py-1 px-4">
    <Header v-if="!navigation" title="Myriad" />

    <router-view class="h-full min-h-[80vh]"> </router-view>
    <Footer v-if="!navigation" />
  </div>
</template>

<script>
import Header from './components/Navigation/Header.vue'
import Footer from './components/Navigation/Footer.vue'

import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
  },
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      navigation: null,
    }
  },
  created() {
    this.checkRoute()
  },
  methods: {
    checkRoute() {
      if (
        this.$route.name === 'Login' ||
        this.$route.name === 'Signup' ||
        this.$route.name === 'ForgotPassword'
      ) {
        this.navigation = false
        // return this value to true if you want those elements to not be shown
        return
      }
      this.navigation = false
    },
  },
  watch: {
    $route() {
      this.checkRoute()
    },
  },
  metaInfo: {
    title: 'Myriad',
    titleTemplate: null,
    htmlAttrs: {
      lang: 'en',
      amp: true,
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'description',
        content: 'A Vue3 + openAI + Firebase/Firestore app',
      },
      { name: 'author', content: 'Víctor Balaguera' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
}
</script>

<style></style>
