<template>
  <div class="h-full min-h-[80vh]">
    <div class="queriesPage-queries" v-if="queriesElements.length > 0">
      <div class="queriesPage-queries-title_btns">
        <h2 class="font-semibold text-2xl mb-3">Your AI Queries</h2>

        <div class="d-flex flex-row">
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
        </div>
      </div>

      <div
        class="queriesPage-queries-contents"
        :key="query.id"
        v-for="query in queriesElements"
      >
        <Query :query="query" @delete-query="deleteQuery" />
      </div>
    </div>

    <div v-else>
      <span>You have no AI queries at this moment.</span>
    </div>
  </div>
</template>

<script>
import Query from '@/components/Query/Query.vue'

import Button from '@/components/Button/Button.vue'
import {
  collection,
  getDocs,
  query,
  doc,
  where,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '@/firebase'

const queriesRef = collection(db, 'queries')

export default {
  name: 'AIResults',

  components: {
    Query,
    Button,
  },
  data() {
    return {
      queriesElements: [],
      orderByCreationDateAsc: false,
      orderByAssignedDateAsc: false,
    }
  },

  methods: {
    // fetching from firestore:
    async getqueriesElements() {
      const userId = localStorage.getItem('user')
      const q = query(collection(db, 'queries'), where('user', '==', userId))
      const querySnapshot = await getDocs(q)
      const queriesElements = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        let queriedElementData = doc.data()
        queriedElementData.id = doc.id
        queriesElements.push(queriedElementData)
      })
      const queriesElementsSortedDesc = queriesElements.sort(
        (objA, objB) => Number(objB.createdAt) - Number(objA.createdAt)
      )

      this.queriesElements = queriesElementsSortedDesc
    },
    async deleteQuery(id) {
      if (
        confirm(
          'Are you sure you want to delete this query? This action cannot be undone.'
        )
      ) {
        try {
          await deleteDoc(doc(queriesRef, id)).then(() => {
            this.getqueriesElements()
            alert('Query deleted.')
          })
        } catch (error) {
          console.log(error)
        }
      }
    },
    orderByCreatedAtAsc() {
      this.queriesElements = this.queriesElements.sort(
        (objA, objB) => Number(objA.createdAt) - Number(objB.createdAt)
      )
      this.orderByCreationDateAsc = true
    },
    orderByCreatedAtDesc() {
      this.queriesElements = this.queriesElements.sort(
        (objA, objB) => Number(objB.createdAt) - Number(objA.createdAt)
      )
      this.orderByCreationDateAsc = false
    },
  },
  mounted() {
    this.getqueriesElements()
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
}
</script>

<style>
.queriesPage-queries-title_btns {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

@media screen and (max-width: 992px) {
  .queriesPage-queries-title_btns {
    flex-direction: column;
  }
}
</style>
