<template>
  <v-snackbar
    v-model="setSnackbar"
    :color="snackbar.color"
    bottom
    right
    :timeout="snackbar.timeout"
  >
    <p class="ma-0 font-weight-black">{{ snackbar.message }}</p>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    snackbar() {
      return this.$store.state.snackbar.options
    },
    setSnackbar: {
      get() {
        return !!this.snackbar.message
      },
      set(val) {
        this.resetSnackbar()
        return val
      },
    },
  },
  methods: {
    resetSnackbar() {
      setTimeout(() => {
        this.$store.dispatch('snackbar/getSnackbar', { message: null })
      }, 500)
    },
  },
}
</script>
