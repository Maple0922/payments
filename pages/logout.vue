<template>
  <v-container>
    <h1 class="mb-12">Logout</h1>
  </v-container>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth'

export default {
  mounted() {
    this.logout()
  },
  methods: {
    logout() {
      const auth = getAuth()
      signOut(auth)
        .then(() => {
          this.$router.push({ path: '/' })
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>
