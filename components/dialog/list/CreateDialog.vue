<template>
  <v-dialog v-model="dialog" width="600px">
    <template #activator="{ on, attrs }">
      <v-btn
        class="mb-2 custom-transform-class text-none"
        fab
        dark
        x-small
        color="indigo"
        depressed
        v-bind="attrs"
        v-on="on"
      >
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>
    </template>
    <v-card class="py-2">
      <v-card-title><span class="text-h6 mb-8">新規作成</span></v-card-title>
      <v-card-text>
        <v-form ref="form">
          <DateForm :now-date="payment.date" @updateChildDate="updateDate" />
          <NameForm :now-name="payment.name" @updateChildName="updateName" />
          <PriceForm
            :now-price="payment.price.toString()"
            @updateChildPrice="updatePrice"
          />
          <TagForm :now-tag="payment.tag" @updateChildTag="updateTag" />
        </v-form>
      </v-card-text>
      <v-card-actions class="mt-8">
        <v-spacer></v-spacer>
        <v-btn dark color="blue darken-4" @click="create">作成</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DateForm from '@/components/form/list/DateForm.vue'
import NameForm from '@/components/form/list/NameForm.vue'
import TagForm from '@/components/form/list/TagForm.vue'
import PriceForm from '@/components/form/list/PriceForm.vue'

export default {
  components: {
    DateForm,
    NameForm,
    TagForm,
    PriceForm,
  },
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
