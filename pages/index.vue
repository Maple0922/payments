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
          @click="loginWithGoogle"
        >
          <v-icon small class="mr-2">mdi-google</v-icon>
          Login with Google
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

export default {
  layout: 'unauthorized',

  data() {
    return {
      snackbar: {
        success: {
          message: 'ログインしました。',
          color: 'success',
        },
        failure: {
          message: 'ログインに失敗しました。',
          color: 'error',
        },
      },
    }
  },

  methods: {
    loginWithGoogle() {
      const provider = new GoogleAuthProvider()
      const auth = getAuth()
      this.$router.push({ path: '/login' })

      signInWithPopup(auth, provider)
        .then((res) => {
          this.createUserIfNotExist(res.user)
          this.$store.dispatch('snackbar/getSnackbar', this.snackbar.success)
        })
        .catch((err) => {
          const errorCode = err.code
          const errorMessage = err.message
          const email = err.email
          const credential = GoogleAuthProvider.credentialFromError(err)
          console.error(errorCode, errorMessage, email, credential) // eslint-disable-line no-console
          this.$store.dispatch('snackbar/getSnackbar', this.snackbar.failure)
        })
        .finally(() => {
          this.$router.push({ path: '/list' })
        })
    },
    async createUserIfNotExist(user) {
      const db = getFirestore()
      const userRef = doc(db, 'users', user.uid)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          money: 0,
        })
      }
    },
  },
}
</script>
