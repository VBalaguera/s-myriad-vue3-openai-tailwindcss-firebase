<template>
  <div class="h-full min-h-[80vh] flex">
    <div
      class="my-4 mx-0 flex flex-col justify-center contents-center items-center my-auto mx-auto w-full"
    >
      <h2 class="font-semibold text-2xl">About Myriad</h2>
      <p>
        This is a Vue3 project that uses
        <a
          href="https://openai.com/api/"
          rel="noreferrer noopener"
          class="underline"
          target="_blank"
          >openAI's API</a
        >.
      </p>
      <p>Every user needs to register first using Firebase.</p>
      <p>
        Once logged in, users can save every query and/or generate image they
        like.
      </p>
      <p>Don't forget to learn and have fun!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
}
</script>

<style scoped></style>
