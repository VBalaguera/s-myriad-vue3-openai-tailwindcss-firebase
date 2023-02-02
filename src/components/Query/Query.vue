<template>
  <div
    class="query bg-slate-600 m-1 py-[10px] px-[20px] flex flex-col justify-between border-l-4 border-solid border-white-600"
  >
    <div>
      <div class="query-info">
        <h3 class="italic text-lg">{{ query.prompt }}</h3>

        <p>{{ query.result }}</p>
      </div>
      <div class="query-dates flex flex-col text-sm mt-2">
        <span
          >Created at:
          {{
            new Date(query.createdAt).toLocaleString('en-us', {
              dateStyle: 'long',
            })
          }}</span
        >
      </div>
      <div class="query-btns flex mt-2">
        <Button
          text="Delete"
          color="#900C3F"
          @click="onDelete(query.id)"
          class="mr-2"
        />
        <!-- TODO: include #900c3f into a variable -->
      </div>
    </div>
  </div>
</template>

<script>
import Button from '../Button/Button.vue'
export default {
  name: 'Query',
  props: {
    query: Object,
  },
  components: {
    Button,
  },
  methods: {
    onDelete(id) {
      this.$emit('delete-query', id)
    },
  },
}
</script>

<style scoped>
@media screen and (max-width: 992px) {
  .query-info p {
    font-size: 0.9rem;
  }

  .query-dates {
    font-size: 0.8rem;
  }
}

@media screen and (max-width: 600px) {
  .query-info p {
    font-size: 0.8rem;
  }

  .query-dates {
    font-size: 0.7rem;
  }
}
</style>
