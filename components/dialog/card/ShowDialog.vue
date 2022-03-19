<template>
  <v-dialog v-model="dialog" width="600px">
    <v-card class="py-2">
      <v-card-title><span class="text-h6 mb-8">詳細</span></v-card-title>
      <v-card-text>a </v-card-text>
      <v-card-actions class="mt-8">
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      dialog: false,
      payment: {
        date: this.getFormattedToday(),
        name: '',
        tag: '',
        price: 0,
      },
    }
  },
  methods: {
    create() {
      if (this.$refs.form.validate()) {
        this.$emit('create', this.payment)
        this.$refs.form.reset()
      }
    },
    updateDate(date) {
      this.payment.date = date
    },
    updateName(name) {
      this.payment.name = name
    },
    updatePrice(price) {
      this.payment.price = price
    },
    updateTag(tag) {
      this.payment.tag = tag
    },
    getFormattedToday() {
      return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    },
  },
}
</script>
