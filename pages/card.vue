<template>
  <v-container class="card-container">
    <h1 class="mb-12">Card</h1>
    <v-row align="start">
      <v-col
        v-for="(card, key) in cards"
        ref="creditCard"
        :key="key"
        class="pa-3 pa-md-4"
        cols="6"
        lg="2"
        md="3"
        sm="4"
      >
        <v-card
          :color="`#${card.color}`"
          class="cursor-pointer rounded-lg"
          :class="`${textColor(card.color)}--text`"
        >
          <v-responsive :aspect-ratio="1.618">
            <v-card-title>
              {{ card.title }}
            </v-card-title>
            <v-card-text>
              <p>{{ card.number }}</p>
              <p>
                {{ card.name }} {{ card.displayExpirationDate }}
                {{ card.securityCode }}
              </p>
            </v-card-text>
          </v-responsive>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-right">
        <CreateDialog ref="createDialog" @create="create" />
        <ShowDialog ref="showDialog" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getAuth } from 'firebase/auth'
import { getFirestore, getDocs, addDoc, collection } from 'firebase/firestore'

import CreateDialog from '@/components/dialog/card/CreateDialog.vue'
import ShowDialog from '@/components/dialog/card/ShowDialog.vue'

export default {
  components: {
    CreateDialog,
    ShowDialog,
  },
  data() {
    return {
      user: {},
      cards: [],
      loading: false,
      snackbar: {
        success: {
          message: '新規作成しました',
          color: 'success',
        },
        failure: {
          message: 'エラーが発生しました',
          color: 'error',
          timeout: 5000,
        },
      },
    }
  },
  mounted() {
    this.getAuthUser()
    this.getCards()
  },
  methods: {
    getAuthUser() {
      this.user = getAuth().currentUser
    },
    async getCards() {
      this.loading = true
      const db = getFirestore()
      const cardsSnapshot = await getDocs(
        collection(db, 'users', this.user.uid, 'cards')
      )

      this.cards = await Promise.all(
        cardsSnapshot.docs
          .map((cardDoc) => cardDoc.data())
          .map((card) => {
            card.displayExpirationDate = this.formatDate(
              card.expirationDate.toDate()
            )
            return card
          })
      )
      this.loading = false
    },
    async create(card) {
      const cardRecord = this.generateCardRecord(card)
      const db = getFirestore()
      try {
        await addDoc(
          collection(db, 'users', this.user.uid, 'cards'),
          cardRecord
        )
        this.$store.dispatch('snackbar/getSnackbar', this.snackbar.success)
      } catch (e) {
        this.$store.dispatch('snackbar/getSnackbar', this.snackbar.failure)
        console.error(e.message) // eslint-disable-line
      }

      await this.getCards()
      this.$refs.createDialog.dialog = false
    },
    async update() {},
    async delete() {},
    generateCardRecord(card) {
      const [mm, yy] = card.expirationDate.split('/')
      return {
        color: card.color.slice(1),
        title: card.title,
        name: card.name,
        number: card.number,
        expirationDate: new Date(`20${yy}`, mm, 1, 0, 0, 0),
        securityCode: card.securityCode,
      }
    },
    formatDate(dateObject) {
      const yy = dateObject.getFullYear().toString().substr(2, 2)
      const month = dateObject.getMonth() + 1
      const mm = month < 10 ? `0${month}` : month

      return `${mm}/${yy}`
    },
    textColor(cardColorCode) {
      const red = cardColorCode.substr(0, 2)
      const green = cardColorCode.substr(2, 2)
      const blue = cardColorCode.substr(4, 2)
      const brightness = Math.floor(
        parseInt(red, 16) * 0.299 +
          parseInt(green, 16) * 0.587 +
          parseInt(blue, 16) * 0.114
      )
      return brightness >= 140 ? 'black' : 'white'
    },
  },
}
</script>

<style lang="scss">
.list-container {
  max-width: 600px;
  margin: 0 auto;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  padding: 4px;
  word-break: keep-all;
  white-space: nowrap;
}
</style>
