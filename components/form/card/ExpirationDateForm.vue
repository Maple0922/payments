<template>
  <v-row>
    <v-col class="py-0">
      <v-text-field
        :value="nowExpirationDate"
        outlined
        dense
        prepend-icon="mdi-pen"
        label="yy/mm"
        inputmode="numeric"
        type="text"
        name="cc-exp"
        autocomplete="cc-exp"
        :rules="rules"
        @input="updateExpirationDate"
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    nowExpirationDate: {
      type: String,
      default: '',
    },
  },
  data() {
    const max = 20
    return {
      expirationDate: '',
      max,
      rules: [
        (v) => !!v || '必須項目です',
        (v) =>
          (!!v &&
            v.length === 5 &&
            v.includes('/') &&
            v.split('/')[0].length === 2 &&
            Number(v.split('/')[0]) > 0 &&
            Number(v.split('/')[0]) <= 12) ||
          `有効期限が無効です`,
      ],
    }
  },
  methods: {
    updateExpirationDate(expirationDate) {
      if (expirationDate.length === 2) {
        expirationDate += '/'
      }
      this.$emit('updateChildExpirationDate', expirationDate)
    },
  },
}
</script>
