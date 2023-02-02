<template>
  <div>
    <div class="flex flex-col justify-start">
      <span>{{ modalMessage }}</span>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    modalMessage: '',
  },

  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
  },
}
</script>

<style></style>
