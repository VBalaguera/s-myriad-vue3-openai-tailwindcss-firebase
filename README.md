# Welcome to Myriad

This is a simple Vue3 + openAI + TailwindCSS + Firebase/Firestore app.
Created for testing purposes by [Víctor Balaguera](https://github.com/VBalaguera).
What would you like to learn today?

## Begin using the project:

1. Install all dependencies.

```sh
npm install
```

2. Initialize the project

```sh
npm run serve
```

3. Please make sure you have an account in [Firebase](https://firebase.google.com/).
   1. This project requires an account in order to create a new firebase project.
   2. To create said project, go to the [firebase console](https://console.firebase.google.com/), then create it. At the time of creation of this project, a free tier plan (currently named Spark) is available.
   3. [Add Firebase to this project](https://firebase.google.com/docs/web/setup): register the app, then receive the SDK.
   4. Your Firebase SDK will contain all the necessary data to set the auth/firestore functions. The main firebase file is located in src/firebase/index.js. Your personal data, including your API KEY, must be stored in an .env.production file and/or your hosting/repo.
4. Please create an account in [OpenAI](https://openai.com/api/) in order to use its API services.
   1. Once you have created your account and have a new API KEY (which here will be used in VUE_APP_OPENAI_IMAGE_GENERATOR_API_KEY), store it securely.

Found any bugs?, Got any questions, improvements, any suggestions or comments? They are always welcome!

Please contact me at [GitHub](https://github.com/VBalaguera).
