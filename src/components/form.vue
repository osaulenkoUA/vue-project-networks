<template>
  <v-container>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-row>
        <v-col cols="12" w="100">
          <v-text-field
            v-model="network.number"
            label="Number"
            type="number"
          ></v-text-field>
        </v-col>

        <v-col cols="12" w="100">
          <v-text-field
            v-model="network.name"
            label="Name"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="network.frequency"
            label="Frequency"
            type="number"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="network.alias"
            label="Alias"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-textarea
            v-model="network.description"
            label="Description"
          ></v-textarea>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="network.features"
            label="Features"
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="network.x"
            label="X"
            type="number"
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="network.y"
            label="Y"
            type="number"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-btn :disabled="!valid" type="submit" color="primary">Submit</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">


export default ({
  name: 'NetworkForm',
  setup() {


    const submitForm = () => {

    };

    return {

      submitForm,
    };
  },
});
</script>

<style scoped>
/* Add any additional styling here */
</style>
