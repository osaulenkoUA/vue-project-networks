<template>
  <v-select
    class="select"
    type="select"
    clearable
    density="compact"
    :items="itemsSelect"
    :label="label"
    @update:modelValue="onChange"
    :name="name"
  ></v-select>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])

const { name, label, itemsSelect } = defineProps<{
  name: string
  label: string
  itemsSelect: Array<string>
}>()

function onChange(value: string | null) {
  emit('update:modelValue', value)
}
</script>

<style scoped>
.select {
  margin-top: 24px;
  margin-left: 8px;
}
</style>
