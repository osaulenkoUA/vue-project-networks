<template>
  <v-text-field
    v-model="search"
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

<script lang="ts">
export default {
  data: () => ({
    search: ''
  }),
  methods: {
    onHandleInputSearch() {
      this.$emit('searching', this.search)
    }
  }
}
</script>
<style scoped>

</style>
