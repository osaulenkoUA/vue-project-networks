<template>
  <v-text-field
    density="compact"
    label="Search"
    prepend-inner-icon="mdi-magnify"
    variant="solo-filled"
    flat
    hide-details
    single-line
    @input="onHandleInputSearch"
  ></v-text-field>
</template>

<script setup lang="ts">
const emit = defineEmits(['searching'])
function onHandleInputSearch  (e:any) {
      emit('searching',e.target.value)
    }
</script>
<style scoped>

</style>
