<template>
  <v-app v-if="isLoggedIn">
    <v-navigation-drawer
      v-model="drawer"
      dark
      :mini-variant="miniVariant"
      fixed
      app
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
      <v-spacer />
      <v-chip
        v-if="name"
        color="orange darken-4"
        class="text-caption font-weight-bold"
        >{{ name }}</v-chip
      >
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Snackbar />
  </v-app>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Snackbar from '@/components/util/Snackbar.vue'

export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      isLoggedIn: false,
      clipped: false,
      drawer: false,
      name: '',
      items: [
        {
          icon: 'mdi-format-list-bulleted',
          title: 'List',
          to: '/list',
        },
        {
          icon: 'mdi-tag-text-outline',
          title: 'Tag',
          to: '/tag',
        },
        {
          icon: 'mdi-credit-card-multiple-outline',
          title: 'Card',
          to: '/card',
        },
        {
          icon: 'mdi-logout',
          title: 'Logout',
          to: '/logout',
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
        if (!this.isLoggedIn) {
          this.$router.push({ path: '/' })
        } else {
          this.name = user.displayName
        }
      })
    },
  },
}
</script>
