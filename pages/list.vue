<template>
  <v-container class="list-container">
    <h1 class="mb-12">List</h1>
    <v-row>
      <v-col class="pa-0">
        <v-data-table
          :items="payments"
          :headers="headers"
          class="table elevation-1"
          disable-pagination
          hide-default-footer
          mobile-breakpoint="0"
          dense
          :loading="loading"
        >
          <template #[`item.name`]="{ item }">
            <span class="font-weight-bold">{{ item.name }}</span>
          </template>
          <template #[`item.tagName`]="{ item }">
            <v-chip
              class="text-caption font-weight-bold"
              :color="item.tagColor"
              dark
              small
            >
              {{ item.tagName }}
            </v-chip>
          </template>
          <template #[`item.displayPrice`]="{ item }">
            <span
              class="text--darken-4"
              :class="{
                'red--text': item.price < 0,
                'blue--text': item.price > 0,
              }"
              >{{ item.displayPrice }}</span
            >
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-right">
        <CreateDialog ref="createDialog" @create="create" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getAuth } from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  addDoc,
  collection,
} from 'firebase/firestore'

import CreateDialog from '@/components/dialog/CreateDialog.vue'

export default {
  components: {
    CreateDialog,
  },
  data() {
    return {
      user: {},
      payments: [],
      loading: false,
      headers: [
        { text: 'Date', value: 'date' },
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Tag',
          value: 'tagName',
        },
        { text: 'Price', value: 'displayPrice' },
      ],
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
    this.getPayments()
  },
  methods: {
    getAuthUser() {
      this.user = getAuth().currentUser
    },
    async getPayments() {
      this.loading = true
      const db = getFirestore()
      const paymentsSnapshot = await getDocs(
        collection(db, 'users', this.user.uid, 'payments')
      )

      this.payments = await Promise.all(
        paymentsSnapshot.docs
          .map((paymentDoc) => paymentDoc.data())
          .map(async (payment) => {
            payment.date = this.formatDate(payment.at.toDate())
            const tag = await this.findTagByUid(payment.tagUid)
            payment.tagName = tag.name
            payment.tagColor = `#${tag.color}`
            payment.displayPrice = `¥ ${payment.price.toLocaleString()}`
            return payment
          })
      )
      this.payments.sort((a, b) => {
        return a.date < b.date ? -1 : 1
      })
      this.loading = false
    },
    async create(payment) {
      const db = getFirestore()
      try {
        await addDoc(collection(db, 'users', this.user.uid, 'payments'), {
          name: payment.name,
          price: Number(payment.price),
          at: new Date(payment.date),
          tagUid: payment.tag,
        })
        this.$store.dispatch('snackbar/getSnackbar', this.snackbar.success)
      } catch (e) {
        this.$store.dispatch('snackbar/getSnackbar', this.snackbar.failure)
        console.error(e.message)
      }

      await this.getPayments()
      this.$refs.createDialog.dialog = false
    },
    async update() {},
    async delete() {},
    async findTagByUid(tagUid) {
      const db = getFirestore()
      const tagDoc = await getDoc(
        doc(db, 'users', this.user.uid, 'tags', tagUid)
      )
      return tagDoc.data()
    },
    formatDate(dateObject) {
      const year = dateObject.getFullYear()
      const month = dateObject.getMonth() + 1
      const date = dateObject.getDate()

      const yyyy = year
      const mm = month < 10 ? `0${month}` : month
      const dd = date < 10 ? `0${date}` : date
      return `${yyyy}-${mm}-${dd}`
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
