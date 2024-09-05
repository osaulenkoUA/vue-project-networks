<template>
  <v-select
    class="select"
    :items="itemsSelectAlias"
    density="compact"
    v-model="selectedAlias"
    @input="updateAlias"
    label="Позивні"
  ></v-select>
  <v-select
    class="select"
    clearable
    :items="itemsSelectFrequency"
    density="compact"
    label="Частоти"
    v-model="selectedFrequency"
  ></v-select>
</template>

<script>
export default {
  data: () =>({
    selectedFrequency:null,
    selectedAlias:null
}),
  props: {
    itemsSelectAlias: {
      type: Array,
      required: true
    },
    itemsSelectFrequency: {
      type: Array,
      required: true
    }
  },
updated(){
  this.$emit('update:selectedAlias', this.selectedAlias)
  this.$emit('update:selectedFrequency', this.selectedFrequency) // Емісія події для оновлення selectedFrequency
},
  methods: {
    updateAlias(value) {
      this.$emit('update:selectedAlias', value)
    },

  }
}
</script>

<style scoped>
.select {
  margin-top: 24px;
  margin-left: 8px;
}
</style>
