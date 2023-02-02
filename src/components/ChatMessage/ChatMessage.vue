<template>
  <div class="chat-message p-1 flex align-center justify-between mb-1">
    <b
      :class="[user === 'user' ? 'text-orange-400' : 'text-lime-400', 'mr-1']"
      >{{ user }}</b
    >
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: 'ChatMessage',
  props: { message: String, user: String },
}
</script>

<style scoped>
@media screen and (max-width: 992px) {
  .chat-message {
    font-size: 0.8rem;
  }
}
@media screen and (max-width: 600px) {
  .chat-message {
    font-size: 0.7rem;
  }
}
</style>
