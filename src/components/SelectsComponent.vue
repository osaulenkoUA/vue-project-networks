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
    type="select"
    clearable
    :items="itemsSelectFrequency"
    density="compact"
    label="Частоти"
    :value="modelValue"
    @update:modelValue="onChange"
    name="frequency"
  ></v-select>
</template>

<script>
export default {
  data: () => ({
    selectedFrequency: null,
    selectedAlias: null
  }),
  emits: ['update:modelValue','update:selectedAlias'],
  props: {
    modelValue: String,
    itemsSelectAlias: {
      type: Array,
      required: true
    },
    itemsSelectFrequency: {
      type: Array,
      required: true
    }
  },
  updated() {
    this.$emit('update:selectedAlias', this.selectedAlias)
    console.log(this.modelValue)
    // this.$emit('update:selectedFrequency', this.selectedFrequency) // Емісія події для оновлення selectedFrequency
  },
  methods: {
    onChange(value) {
      this.$emit('update:modelValue', value) // Емісія події для оновлення selectedFrequency

    },

    updateAlias(value) {
      this.$emit('update:selectedAlias', value)
    }

  }
}
</script>

<style scoped>
.select {
  margin-top: 24px;
  margin-left: 8px;
}
</style>
