<template>
  <v-btn
    class="mb-2"
    color="primary"
    dark
    v-bind="props"
  >
    Додати Мережу
  </v-btn>
</template>

<script setup lang="ts">
const { props } = defineProps<{
  props: Object
}>()
</script>
