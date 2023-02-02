<template>
  <div :key="note.id" v-for="note in notes">
    <Note :note="note" />
  </div>
</template>

<script>
import Note from './Note/Note.vue'
export default {
  name: 'Notes',
  props: { notes: Array },
  components: {
    Note,
  },
}
</script>

<style></style>
