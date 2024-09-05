<template>
  <v-select
    class="select"
    type="select"
    clearable
    density="compact"
    :items="itemsSelect"
    :label="label"
    :value="modelValue"
    @update:modelValue="onChange"
    :name="name"
  ></v-select>
</template>

<script>
export default {

  emits: ['update:modelValue'],
  props: {
    modelValue: String,
    itemsSelect: Array,
    name: String,
    label: String
  },
  methods: {
    onChange(value) {
      this.$emit('update:modelValue', value)
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
