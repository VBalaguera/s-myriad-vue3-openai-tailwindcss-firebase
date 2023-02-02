<template>
  <div class="h-full min-h-[80vh] forgotpasswordpage">
    <form action="" class="mb-2">
      <h2 class="font-semibold text-2xl">Forgot your password?</h2>
      <div class="form">
        <div class="flex flex-col w-full mb-2">
          <div class="my-2 mx-0">
            <input
              class="w-full md:w-3/4 py-2 px-4 text-black"
              type="text"
              placeholder="Your email"
              v-model="email"
            />
          </div>
        </div>
        <button class="underline" @click.prevent="forgotPassword">
          Submit
        </button>
        <div v-show="error">{{ this.errorMsg }}</div>
        <Loading v-if="loading" />
        <!-- <Modal
          v-if="modalActive"
          v-on:close-modal="closeModal"
          :modalMessage="modalMessage"
        /> -->
      </div>
    </form>
  </div>
</template>

<script>
import Modal from '@/components/Modal/Modal.vue'
import Loading from '@/components/Loading'

import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
export default {
  name: 'ForgotPassword',
  components: {
    Modal,
    Loading,
  },
  data() {
    return {
      email: null,
      modalActive: null,
      modalMessage: '',
      loading: null,
      error: null,
      errorMsg: '',
    }
  },
  methods: {
    closeModal() {
      this.modalActive = !this.modalActive
      this.email = ''
    },
    forgotPassword() {
      const auth = getAuth()
      sendPasswordResetEmail(auth, this.email)
        .then(() => {
          // TODO: use the modal instead!
          alert('Password reset email sent!')
          // this.modalActive = true
          // this.modalMessage = 'Password reset email sent'
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              this.error = true
              this.errorMsg = 'Invalid email.'
              break
            case 'auth/user-not-found':
              this.error = true
              this.errorMsg = 'User not found.'
              break
            default:
              alert('Something went wrong')
          }
        })
    },
  },
}
</script>

<style></style>
