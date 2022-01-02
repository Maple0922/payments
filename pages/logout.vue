<template>
  <v-container>
    <h1 class="mb-12">Logout</h1>
  </v-container>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth'

export default {
  data() {
    return {
      snackbar: {
        success: {
          message: 'ログアウトしました。',
          color: 'success',
        },
        failure: {
          message: 'ログアウトに失敗しました。',
          color: 'error',
        },
      },
    }
  },
  mounted() {
    this.logout()
  },
  methods: {
    logout() {
      const auth = getAuth()
      signOut(auth)
        .then(() => {
          this.$router.push({ path: '/' })
          this.$store.dispatch('snackbar/getSnackbar', this.snackbar.success)
        })
        .catch((err) => {
          console.error(err)
          this.$store.dispatch('snackbar/getSnackbar', this.snackbar.failure)
        })
    },
  },
}
</script>
