<template>
  <v-app v-if="!isLoggedIn">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      fixed
      app
      dark
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
  data() {
    return {
      isLoggedIn: true,
      clipped: false,
      drawer: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-login',
          title: 'Login',
          to: '/login',
        },
      ],
      miniVariant: false,
      title: 'Payments',
    }
  },
  mounted() {
    this.checkAuth()
  },
  methods: {
    checkAuth() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        this.isLoggedIn = !!user
        if (user) {
          this.$router.push({ path: '/list' })
        }
      })
    },
  },
}
</script>
