// vuex

import { createStore } from 'vuex'
import router from './router'

// firebase
import { auth } from './firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from 'firebase/auth'

const store = createStore({
  state() {
    return {
      user: null,
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    clearUser(state) {
      state.user = null
    },
  },
  actions: {
    async login(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password)
      if (response) {
        context.commit('setUser', auth.currentUser)
        localStorage.setItem('logged in', true)
        localStorage.setItem('user', auth.currentUser.uid)
      } else {
        switch (error.code) {
          case 'auth/user-not-found':
            alert('User not found')
            break
          case 'auth/wrong-password':
            alert('Wrong password')
            break
          default:
            alert('Something went wrong')
        }
      }
    },
    async register(context, { email, password }) {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      if (response) {
        context.commit('setUser', auth.currentUser)
      } else {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('Email already in use')
            break
          case 'auth/invalid-email':
            alert('Invalid email')
            break
          case 'auth/operation-not-allowed':
            alert('Operation not allowed')
            break
          default:
            alert('Something went wrong')
        }
      }
    },
    async logout({ commit }) {
      await signOut(auth)
      localStorage.setItem('logged in', false)
      localStorage.setItem('user', '')

      commit('clearUser')

      router.push('/login')
    },
    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit('clearUser')
        } else {
          commit('setUser', user)

          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/')
          }
        }
      })
    },
  },

  modules: {},
})

export default store
