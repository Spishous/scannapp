<script>
export default {
  props: {
    from: Number,
    to: Number,
  },
};
</script>

<template>
  <ul>
    <li v-for="n in to" :key="n" class="inline-flex mx-2">
      <span v-if="n <= from" class="h-2 w-2 bg-ciel-bleu-400 rounded-lg"></span>
      <span
        v-else
        class="h-2 w-2 bg-ciel-bleu-200 bg-opacity-30 rounded-lg"
      ></span>
    </li>
  </ul>
</template>

<style scoped></style>
