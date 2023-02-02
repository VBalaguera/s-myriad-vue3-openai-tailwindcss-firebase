<template>
  <div :class="[note.finished ? 'line-through' : '']">
    <div
      :class="[
        note.reminder
          ? ' border-l-4 border-solid border-lime-500'
          : 'border-l-4 border-solid border-slate-600',
        'bg-slate-600 m-1 py-[10px] px-[15px] flex flex-col justify-between border-left ',
      ]"
    >
      <div class="note-info">
        <h3>{{ note.title }}</h3>

        <p>{{ note.content }}</p>
      </div>
      <div class="note-dates flex flex-col text-sm mt-2">
        <span
          >Date:
          {{
            new Date(note.date.seconds * 1000).toLocaleDateString('en-us', {
              dateStyle: 'long',
            })
          }}</span
        >
        <span
          >Created at:
          {{
            new Date(note.createdAt).toLocaleString('en-us', {
              dateStyle: 'long',
            })
          }}</span
        >
      </div>
      <div class="note-btns flex mt-2">
        <Button
          :text="note.finished ? 'Unfinish' : 'Finish'"
          color="navy"
          @click="updateNoteState(note.id, note.finished)"
          class="mr-2"
        />

        <Button
          :text="note.reminder ? 'Do not remind me' : 'Remind me'"
          color="navy"
          @click="updateNoteReminder(note.id, note.reminder)"
          class="mr-2"
        />
        <Button
          text="Delete"
          color="#900C3F"
          @click="onDelete(note.id)"
          class="mr-2"
        />
        <!-- TODO: include #900c3f into a variable -->
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button/Button.vue'
export default {
  name: 'Note',
  props: {
    note: Object,
  },
  components: {
    Button,
  },
  methods: {
    onDelete(id) {
      this.$emit('delete-note', id)
    },
    updateNoteState(id, finished) {
      this.$emit('update-note-state', id, finished)
    },
    updateNoteReminder(id, reminder) {
      this.$emit('update-note-reminder', id, reminder)
    },
  },
}
</script>

<style scoped>
@media screen and (max-width: 992px) {
  .note-info p {
    font-size: 0.9rem;
  }

  .note-dates {
    font-size: 0.8rem;
  }
}

@media screen and (max-width: 600px) {
  .note-info p {
    font-size: 0.8rem;
  }

  .note-dates {
    font-size: 0.7rem;
  }
}
</style>
