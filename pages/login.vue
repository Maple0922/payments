<template>
  <v-app dark>
    <v-container>
      <h1 class="mb-12">Login</h1>
      <v-row justify="center" class="text-center">
        <v-col>
          <p class="text-body-2">Googleアカウントでログインしてください</p>
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
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

export default {
  layout: 'unauthorized',

  mounted() {
    this.loginWithGoogle()
  },
  methods: {
    loginWithGoogle() {
      const provider = new GoogleAuthProvider()
      const auth = getAuth()

      signInWithPopup(auth, provider)
        .then((res) => {
          this.createUserIfNotExist(res.user)
        })
        .then(() => {
          this.$router.push({ path: '/list' })
        })
        .catch((err) => {
          const errorCode = err.code
          const errorMessage = err.message
          const email = err.email
          const credential = GoogleAuthProvider.credentialFromError(err)
          console.error(errorCode, errorMessage, email, credential) // eslint-disable-line no-console
        })
        .finally(() => {
          this.$router.push('/list')
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
