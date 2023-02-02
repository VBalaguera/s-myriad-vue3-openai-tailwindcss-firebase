<template>
  <div class="h-full min-h-[80vh]">
    <h2 class="font-semibold text-2xl">Profile</h2>
    <div>latests note here:</div>
  </div>
</template>

<script>
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from 'firebase/firestore'
import { db } from '@/firebase'
export default {
  name: 'Profile',
  data() {
    return {
      queriedNotes: [],
    }
  },
  methods: {
    async getQueriedNotes() {
      const userId = localStorage.getItem('user')
      const q = query(
        collection(db, 'queries'),
        where('user', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(1)
      )
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

<style></style>
