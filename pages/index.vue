<template>
  <v-container>
    <h1 class="mb-12">Index</h1>
    <v-row justify="center">
      <v-col align-self="center" class="text-center">
        <v-btn
          class="mb-2 custom-transform-class text-none"
          width="80%"
          max-width="300"
          depressed
          color="primary"
          to="login"
        >
          <v-icon small class="mr-2">mdi-google</v-icon>
          Login with Google
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'unauthorized',
}
</script>
