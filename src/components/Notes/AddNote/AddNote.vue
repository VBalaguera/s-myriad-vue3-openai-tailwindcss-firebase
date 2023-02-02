<template>
  <form @submit="onSubmit" class="mb-[40px]">
    <div>
      <div class="form-control">
        <label for="title">title</label
        ><input
          type="text"
          name="title"
          placeholder="Title here"
          v-model="title"
          class="w-full h-[40px] py-[3px] px-[7px] text-black border border-1 border-solid border-black"
          required
        />
      </div>
      <div class="form-control">
        <label for="content">content</label
        ><input
          type="text"
          name="content"
          placeholder="Content here"
          v-model="content"
          class="w-full h-[40px] py-[3px] px-[7px] text-black border border-1 border-solid border-black"
          required
        />
      </div>
      <div class="form-control">
        <label for="date">date</label>
        <Datepicker v-model="pickedDate" />
        <!-- <input
          type="text"
          name="date"
          placeholder="Add Date and Time"
          class="w-full h-[40px] py-[3px] px-[7px] text-black border border-1 border-solid border-black"
          required
        /> -->
      </div>
      <div class="my-[20px] mx-0 w-full">
        <label for="reminder">Set reminder</label>
        <input type="checkbox" name="reminder" v-model="reminder" />
      </div>
      <button type="submit" class="btn btn-block form-control-input">
        Submit
      </button>
    </div>
  </form>
</template>

<script>
const userId = localStorage.getItem('user')

// date picker
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: 'AddNote',
  data() {
    return {
      title: '',
      content: '',
      pickedDate: '',
      createdAt: Date.now(),
      user: userId,
      finished: false,
      reminder: false,
    }
  },
  components: {
    Datepicker,
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()

      const note = {
        title: this.title,
        content: this.content,
        date: this.pickedDate,
        createdAt: this.createdAt,
        reminder: this.reminder,
        finished: this.finished,
        user: this.user,
      }

      this.$emit('add-note', note)

      this.title = ''
      this.content = ''
      ;(this.date = ''), (this.createdAt = Date.now()), (this.reminder = false)
    },
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
}
</script>

<style scoped></style>
