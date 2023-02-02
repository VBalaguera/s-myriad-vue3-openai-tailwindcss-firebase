<template>
  <div class="h-full min-h-[80vh]">
    <h2 class="font-semibold text-2xl">404</h2>
    <Button @click="goBack" text="Go Back" color="#196800" />
  </div>
</template>

<script>
import Button from '@/components/Button/Button.vue'
export default {
  name: 'NotFound',
  components: {
    Button,
  },
  methods: {
    goBack() {
      return this.$router.go(-1)
    },
  },
}
</script>

<style></style>
