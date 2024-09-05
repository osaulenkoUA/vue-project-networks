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

<script>
export default {
  name:'AddNetworkButton',
  props: {
    props: Object
  },
 }


</script>
