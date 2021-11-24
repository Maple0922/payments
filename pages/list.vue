<template>
  <v-container>
    <h1 class="mb-12">List</h1>
    <v-row>
      <v-col class="pa-0">
        <v-data-table
          :items="payments"
          :headers="headers"
          class="elevation-1"
          disable-pagination
          hide-default-footer
          mobile-breakpoint="0"
          dense
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
        <v-btn
          class="mb-2 custom-transform-class text-none"
          fab
          dark
          x-small
          color="indigo"
          depressed
          to="list/create"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
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
  // query,
  // where,
  collection,
} from 'firebase/firestore'
export default {
  data() {
    return {
      payments: [],
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
    }
  },
  mounted() {
    this.getPayments()
  },
  methods: {
    async getPayments() {
      const user = getAuth().currentUser
      const db = getFirestore()
      const paymentsSnapshot = await getDocs(
        collection(db, 'users', user.uid, 'payments')
      )

      this.payments = await Promise.all(
        paymentsSnapshot.docs
          .map((paymentDoc) => paymentDoc.data())
          .map(async (payment) => {
            payment.date = this.formatDate(payment.at.toDate())
            const tag = await this.findTagByUid(user.uid, payment.tagUid)
            payment.tagName = tag.name
            payment.tagColor = `#${tag.color}`
            payment.displayPrice = `¥ ${payment.price.toLocaleString()}`
            return payment
          })
          .sort((a, b) => {
            return a.at < b.at ? 1 : -1
          })
      )
    },
    async findTagByUid(userUid, tagUid) {
      const db = getFirestore()
      const tagDoc = await getDoc(doc(db, 'users', userUid, 'tags', tagUid))
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
    getTagColor(tag) {},
  },
}
</script>

<style lang="scss">
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  padding: 4px;
  word-break: keep-all;
  white-space: nowrap;
}
</style>
