<template>
  <v-app dark>
    <v-container>
      <h1 class="mb-12">Login</h1>
      <v-row justify="center" class="text-center">
        <v-col>
          <p class="text-body-2">Googleアカウントでログインしています</p>
          <v-btn
            class="mb-2 custom-transform-class text-none"
            width="80%"
            max-width="300"
            depressed
            outlined
            to="/"
          >
            Back
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'unauthorized',
}
</script>
