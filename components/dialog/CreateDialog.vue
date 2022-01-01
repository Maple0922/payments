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
    <v-card>
      <v-card-title> <span class="text-h5">New</span> </v-card-title>
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
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn dark color="blue darken-4" @click="create">create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DateForm from '@/components/form/DateForm.vue'
import NameForm from '@/components/form/NameForm.vue'
import TagForm from '@/components/form/TagForm.vue'
import PriceForm from '@/components/form/PriceForm.vue'

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
      }
      this.$refs.form.reset()
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
