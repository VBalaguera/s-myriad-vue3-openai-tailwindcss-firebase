<template>
  <div
    class="h-full min-h-[80vh] aipage flex border border-1 border-solid border-zinc-600"
  >
    <div v-if="errorMsg">{{ errorMsg }}</div>

    <div class="aipage-left p-2">
      <!-- responsive menu -->
      <div class="aipage-left-responsive-menu">
        <div class="relative">
          <!-- Dropdown toggle button -->
          <button @click="show = !show" class="flex items-center p-2">
            <span>Select an option</span>
          </button>

          <!-- Dropdown menu -->
          <div
            v-show="show"
            class="absolute p-4 mt-2 bg-black rounded-md shadow-xl w-[90vw] left-[-6rem]"
          >
            <div v-for="option in aiOptions" :key="option.index">
              <span
                @click="
                  () => {
                    selectOption(option.option)
                    this.selection = option.name
                    this.show = !show
                  }
                "
                >{{ option.name }}</span
              >
            </div>
            <span
              @click="
                () => {
                  toggleImageGenerator()
                  this.show = !show
                }
              "
              >image generator</span
            >
          </div>
        </div>
      </div>
      <!-- end responsive menu -->
      <div class="aipage-left-options">
        <label for="">select an option</label>
        <div v-for="option in aiOptions" :key="option.index">
          <span
            @click="
              () => {
                selectOption(option.option)
                this.selection = option.name
              }
            "
            >{{ option.name }}</span
          >
        </div>
        <span @click="toggleImageGenerator">image generator</span>
      </div>
    </div>
    <div class="aipage-right flex flex-col w-full h-[85vh] p-2 justify-between">
      <div class="aipage-right-result overflow-auto">
        <!-- ai text results -->
        <div v-show="!showImageGenerator">
          <div class="flex justify-between aipage-right-result-top">
            <span>{{
              selection ? `You've selected ${selection}` : 'Welcome to Myriad'
            }}</span>
            <div v-if="result">
              <button @click="uploadResult" class="mr-2">
                {{ loading ? 'Loading' : 'Save last result?' }}
              </button>
              <button @click="clearChat">Clear chat</button>
            </div>
          </div>
          <div v-for="message in messages" :key="message.index" class="mt-2">
            <ChatMessage :user="message.user" :message="message.message" />
          </div>
        </div>

        <!-- end ai text results -->

        <!-- generate image results -->
        <div v-show="showImageGenerator">
          <div class="flex justify-between aipage-right-result-top">
            <span>{{ selection }}</span>
            <div v-show="this.photo">
              <a
                :href="this.photo"
                target="_blank"
                rel="noreferrer noopener"
                class="mr-2"
              >
                Download this image?
              </a>
              <button @click="clearImageResult">Clear result</button>
            </div>
          </div>

          <div class="image-result flex flex-col">
            <img
              class="image-result-img my-2 mx-0 w-full min-h-[400px] object-contain"
              v-show="this.photo"
              :src="photo"
              :alt="input"
            />
          </div>
        </div>

        <!-- end generate image results -->
      </div>
      <div class="aipage-right-inputs flex flex-col">
        <!-- ai text generator form here -->
        <form>
          <div v-show="!showImageGenerator">
            <div v-if="aiSelected !== null">
              <div class="form-control">
                <input
                  type="text"
                  name="prompt"
                  placeholder="Write a description here!"
                  v-model="prompt"
                  class="w-full h-[40px] py-[3px] px-[7px] text-black border border-1 border-solid border-black"
                  required
                />
              </div>
              <div>
                <button
                  :disabled="!aiSelected"
                  class="btn btn-block form-control-input mt-2"
                  @click="onSubmitGenerateText"
                >
                  {{ loading ? 'Loading' : 'Enter' }}
                </button>
              </div>
            </div>
          </div>
        </form>
        <!-- end text generator form here -->
        <!-- image generation  form-->

        <div v-show="showImageGenerator">
          <form>
            <div>
              <div class="form-control">
                <input
                  type="text"
                  name="input"
                  placeholder="Write a description here!"
                  v-model="input"
                  class="w-full h-[40px] py-[3px] px-[7px] text-black border border-1 border-solid border-black"
                  required
                />
              </div>
            </div>
            <button
              @click="onSubmitImageGenerator"
              class="btn btn-block form-control-input mt-2"
            >
              {{ loading ? 'Loading' : 'Generate Image' }}
            </button>
          </form>
        </div>

        <!-- end image generator form -->
      </div>
    </div>

    <!--  -->
  </div>
  <!--  -->
</template>

<script>
const userId = localStorage.getItem('user')

// openai options
import { aiOptions } from '../data/aiOptions'

// openai
import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
  organization: 'org-5bUgC6fZlqlRVk9XaGoqUz7s',
  apiKey: process.env.VUE_APP_OPENAI_IMAGE_GENERATOR_API_KEY,
})
const openai = new OpenAIApi(configuration)

import ChatMessage from '../components/ChatMessage/ChatMessage.vue'

// firestore
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebase'

const resultsRef = collection(db, 'queries')

export default {
  name: 'AIPage',
  components: {
    ChatMessage,
  },
  data() {
    return {
      name: '',
      prompt: '',
      input: '',
      user: userId,
      photo: '',
      result: '',
      aiOptions: aiOptions,
      aiSelected: null,
      messages: [
        {
          user: 'openAi',
          message: "Let's learn something new together today!",
        },
      ],
      loading: false,
      errorMsg: null,
      showImageGenerator: false,
      selection: null,
      show: false,
      // success: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    // image generation
    async onSubmitImageGenerator(e) {
      e.preventDefault()
      this.loading = true
      try {
        const response = await openai.createImage({
          prompt: this.input,
          n: 1, // number of images to generate
          size: '1024x1024',
        })

        this.photo = response.data.data[0].url

        this.loading = false
      } catch (error) {
        this.errorMsg = error
        console.error(error)
        this.loading = false
      }
    },
    selectOption(option) {
      this.aiSelected = option
      this.showImageGenerator = false
    },
    async onSubmitGenerateText(e) {
      e.preventDefault()
      this.loading = true

      // user's input
      const messages = [
        ...this.messages,
        { user: 'user', message: this.prompt },
      ]
      this.messages = messages
      const option = this.aiSelected

      const query = {
        ...option,

        prompt: this.prompt,
      }

      try {
        const response = await openai.createCompletion(query)

        const messages = [
          ...this.messages,
          { user: 'openAi', message: response.data.choices[0].text },
        ]
        this.messages = messages

        this.result = response.data.choices[0].text
        this.loading = false
      } catch (error) {
        console.log(error)
        this.errorMsg = error
        this.loading = false
      }
    },
    async uploadResult(e) {
      e.preventDefault()

      const note = {
        // create a new field called category
        // value comes from the selected option
        // use this value to filter the queries in /ai-queries route
        prompt: this.prompt,
        result: this.result,
        createdAt: Date.now(),
        user: this.user,
      }
      try {
        await addDoc(resultsRef, note)
        alert('Last result added to your register.')
      } catch (error) {
        console.log(error)
        alert(error.message)
      }
    },
    clearChat() {
      this.messages = []
    },
    clearImageResult() {
      this.photo = ''
    },
    toggleImageGenerator() {
      this.showImageGenerator = true
      this.selection = "You've selected Image Generator"
    },
    hideImageGenerator() {
      this.showImageGenerator = false
    },
  },
}
</script>

<style scoped>
@media screen and (max-width: 992px) {
  .aipage-right-result-top {
    font-size: 0.8rem;
  }

  .aipage-right-result-top div {
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
  }
}
@media screen and (max-width: 600px) {
  .aipage-right-result-top {
    font-size: 0.7rem;
  }
}
</style>
