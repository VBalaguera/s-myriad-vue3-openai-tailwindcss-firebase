<template>
  <div class="h-full min-h-[80vh]">
    <div class="notesPage-note_creation">
      <Button
        @click="toggleAddNote"
        :text="showAddNote ? 'Close' : 'Add note'"
        color="#196800"
      />
      <!-- TODO: include #196800 into a variable -->
      <AddNote v-show="showAddNote" @add-note="addNote" />
    </div>

    <div class="notesPage-notes" v-if="queriedNotes.length > 0">
      <div class="notesPage-notes-title_btns">
        <h2 class="font-semibold text-2xl my-3">Your notes</h2>

        <div class="d-flex flex-row">
          <!-- order notes by createdAd -->
          <Button
            v-show="orderByCreationDateAsc"
            @click="orderByCreatedAtDesc"
            text="Most recently created first"
            color="#196800"
            class="mr-2"
          />
          <Button
            v-show="!orderByCreationDateAsc"
            @click="orderByCreatedAtAsc"
            text="Lastest created first"
            color="#196800"
            class="mr-2"
          />
          <!--  -->
          <!-- order notes by date -->
          <Button
            v-show="orderByAssignedDateAsc"
            @click="orderByDateDesc"
            text="Most urgents first"
            color="#196800"
            class="mr-2"
          />
          <Button
            v-show="!orderByAssignedDateAsc"
            @click="orderByDateAsc"
            text="Latests first"
            color="#196800"
            class="mr-2"
          />
          <Button
            v-show="!orderByStatus"
            @click="showFinishedFirst"
            text="Finished first"
            color="#196800"
            class="mr-2"
          />
          <Button
            v-show="orderByStatus"
            @click="showFinishedLast"
            text="Finished last"
            color="#196800"
            class="mr-2"
          />
          <Button
            v-show="!orderByReminder"
            @click="showRemindedFirst"
            text="Reminded first"
            color="#196800"
            class="mr-2"
          />
          <Button
            v-show="orderByReminder"
            @click="showRemindedLast"
            text="Reminded last"
            color="#196800"
            class="mr-2"
          />
          <!--  -->
        </div>
      </div>

      <div
        class="notesPage-notes-contents"
        :key="note.id"
        v-for="note in queriedNotes"
      >
        <Note
          :note="note"
          @delete-note="deleteNote"
          @update-note-state="updateNoteState"
          @update-note-reminder="updateNoteReminder"
        />
      </div>
    </div>

    <div v-else>
      <span>You have no notes at this moment.</span>
    </div>
  </div>
</template>

<script>
import AddNote from '@/components/Notes/AddNote/AddNote.vue'
import Notes from '@/components/Notes/Notes.vue'
import Note from '@/components/Notes/Note/Note.vue'
import Button from '@/components/Button/Button.vue'
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
  name: 'Notes',

  components: {
    AddNote,
    Notes,
    Note,
    Button,
  },
  data() {
    return {
      showAddNote: false,
      queriedNotes: [],
      orderByCreationDateAsc: false,
      orderByAssignedDateAsc: false,
      orderByStatus: false,
      orderByReminder: false,
    }
  },

  methods: {
    // fetching from firestore:
    async getQueriedNotes() {
      const userId = localStorage.getItem('user')
      const q = query(collection(db, 'notes'), where('user', '==', userId))
      const querySnapshot = await getDocs(q)
      const queriedNotes = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        let queriedNoteData = doc.data()
        queriedNoteData.id = doc.id
        queriedNotes.push(queriedNoteData)
      })
      const queriedNotesSortedDesc = queriedNotes.sort(
        (objA, objB) => Number(objB.createdAt) - Number(objA.createdAt)
      )

      this.queriedNotes = queriedNotesSortedDesc
    },
    async addNote(note) {
      await addDoc(notesRef, {
        title: note.title,
        content: note.content,
        date: note.date,
        createdAt: note.createdAt,
        reminder: note.reminder,
        finished: note.finished,
        user: note.user,
      }).then(() => {
        this.getQueriedNotes()
        alert('Note added.')
      })
    },
    async deleteNote(id) {
      if (
        confirm(
          'Are you sure you want to delete this note? This action cannot be undone.'
        )
      ) {
        try {
          await deleteDoc(doc(notesRef, id)).then(() => {
            this.getQueriedNotes()
            alert('Note deleted.')
          })
        } catch (error) {
          console.log(error)
        }
      }
    },
    async updateNoteReminder(id, reminder) {
      try {
        await updateDoc(doc(db, 'notes', id), {
          reminder: !reminder,
        }).then(this.getQueriedNotes())
      } catch (error) {
        console.log(error)
      }
    },
    async updateNoteState(id, finished) {
      try {
        await updateDoc(doc(db, 'notes', id), {
          finished: !finished,
        }).then(this.getQueriedNotes())
      } catch (error) {
        console.log(error)
      }
    },
    // order notes by creation date
    orderByCreatedAtAsc() {
      this.queriedNotes = this.queriedNotes.sort(
        (objA, objB) => Number(objA.createdAt) - Number(objB.createdAt)
      )
      this.orderByCreationDateAsc = true
    },
    orderByCreatedAtDesc() {
      this.queriedNotes = this.queriedNotes.sort(
        (objA, objB) => Number(objB.createdAt) - Number(objA.createdAt)
      )
      this.orderByCreationDateAsc = false
    },
    // order notes by assigned date
    orderByDateAsc() {
      this.queriedNotes = this.queriedNotes.sort(
        (objA, objB) => Number(objA.date) - Number(objB.date)
      )
      this.orderByAssignedDateAsc = true
    },
    orderByDateDesc() {
      this.queriedNotes = this.queriedNotes.sort(
        (objA, objB) => Number(objB.date) - Number(objA.date)
      )
      this.orderByAssignedDateAsc = false
    },
    // filter finished notes:
    showFinishedFirst() {
      this.queriedNotes = this.queriedNotes.sort(
        (a, b) => a.finished - b.finished
      )
      this.orderByStatus = true
    },
    showFinishedLast() {
      this.queriedNotes = this.queriedNotes.sort(
        (a, b) => b.finished - a.finished
      )
      this.orderByStatus = false
    },
    showRemindedFirst() {
      this.queriedNotes = this.queriedNotes.sort(
        (a, b) => a.reminder - b.reminder
      )
      this.orderByReminder = true
    },
    showRemindedLast() {
      this.queriedNotes = this.queriedNotes.sort(
        (a, b) => b.reminder - a.reminder
      )
      this.orderByReminder = false
    },

    toggleAddNote() {
      this.showAddNote = !this.showAddNote
    },
  },
  mounted() {
    this.getQueriedNotes()
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
}
</script>

<style>
.notesPage-notes-title_btns {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

@media screen and (max-width: 992px) {
  .notesPage-notes-title_btns {
    flex-direction: column;
  }
}
</style>
