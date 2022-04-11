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
        <v-card
          class="mx-auto mb-8"
          width="300"
          :color="card.color"
          :class="`${textColor}--text`"
        >
          <v-responsive aspect-ratio="1.618">
            <v-card-title>
              {{ card.title }}
            </v-card-title>
            <v-card-text>
              <p>{{ card.number }}</p>
              <p>{{ card.name }}</p>
              <p>{{ card.expirationDate }} {{ card.securityCode }}</p>
            </v-card-text>
          </v-responsive>
        </v-card>
        <v-form ref="form">
          <ColorForm :now-color="card.color" @updateChildColor="updateColor" />
          <TitleForm :now-title="card.title" @updateChildTitle="updateTitle" />
          <NameForm :now-name="card.name" @updateChildName="updateName" />
          <NumberForm
            :now-number="card.number"
            @updateChildNumber="updateNumber"
          />
          <v-row>
            <v-col>
              <ExpirationDateForm
                :now-expiration-date="card.expirationDate"
                @updateChildExpirationDate="updateExpirationDate"
              />
            </v-col>
            <v-col>
              <SecurityCodeForm
                :now-security-code="card.securityCode"
                @updateChildSecurityCode="updateSecurityCode"
              />
            </v-col>
          </v-row>
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
import ColorForm from '@/components/form/card/ColorForm.vue'
import TitleForm from '@/components/form/card/TitleForm.vue'
import NameForm from '@/components/form/card/NameForm.vue'
import NumberForm from '@/components/form/card/NumberForm.vue'
import ExpirationDateForm from '@/components/form/card/ExpirationDateForm.vue'
import SecurityCodeForm from '@/components/form/card/SecurityCodeForm.vue'

export default {
  components: {
    ColorForm,
    TitleForm,
    NameForm,
    NumberForm,
    ExpirationDateForm,
    SecurityCodeForm,
  },
  data() {
    return {
      dialog: false,
      card: {
        color: '',
        title: '',
        number: '',
        name: '',
        expirationDate: '',
        securityCode: '',
      },
    }
  },
  computed: {
    textColor() {
      const cardColorCode = this.card.color.slice(1)
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
  methods: {
    create() {
      if (this.$refs.form.validate()) {
        this.$emit('create', this.card)
        this.$refs.form.reset()
      }
    },
    updateColor(color) {
      this.card.color = color
    },
    updateTitle(title) {
      this.card.title = title
    },
    updateName(name) {
      this.card.name = name
    },
    updateNumber(number) {
      this.card.number = number
    },
    updateSecurityCode(securityCode) {
      this.card.securityCode = securityCode
    },
    updateExpirationDate(expirationDate) {
      this.card.expirationDate = expirationDate
    },
    getFormattedToday() {
      return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    },
  },
}
</script>
