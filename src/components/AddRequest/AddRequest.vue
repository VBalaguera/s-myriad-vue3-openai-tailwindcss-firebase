<template>
  <form @submit="onSubmit" class="mb-[40px]">
    <div>
      <div class="form-control">
        <label for="prompt">prompt</label
        ><input
          type="text"
          name="prompt"
          placeholder="prompt here"
          v-model="prompt"
          class="w-full h-[40px] py-[3px] px-[7px] text-black border border-1 border-solid border-black"
          required
        />
      </div>
      <div class="form-control">
        <label for="result">result</label
        ><input
          type="text"
          name="result"
          placeholder="result here"
          v-model="result"
          class="w-full h-[40px] py-[3px] px-[7px] text-black border border-1 border-solid border-black"
          required
        />
      </div>

      <button type="submit" class="btn btn-block w-full">Submit</button>
    </div>
  </form>
</template>

<script>
const userId = localStorage.getItem('user')

import {
  collection,
  getDocs,
  query,
  doc,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '@/firebase'

const notesRef = collection(db, 'notes')

export default {
  name: 'AddRequest',
  props: {
    prompt: String,
    result: String,
    userId: String,
  },
  data() {
    return {
      prompt: prompt,
      result: result,
      createdAt: Date.now(),
      user: userId,
    }
  },

  methods: {
    async onSubmit(e) {
      e.preventDefault()

      const note = {
        prompt: this.prompt,
        result: this.result,
        createdAt: Date.now(),

        user: this.user,
      }

      try {
        await addDoc(notesRef, {
          title: note.title,
          content: note.content,

          createdAt: note.createdAt,

          user: note.user,
        })
      } catch (error) {
        console.log(error)
      }

      this.prompt = ''
      ;(this.result = ''), (this.createdAt = Date.now())
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
/* placeholder styles */
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #0d151f;
  /* TODO: change this */
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #0d151f;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #0d151f;
}
</style>
