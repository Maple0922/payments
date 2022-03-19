<template>
  <v-row>
    <v-col class="py-0">
      <v-text-field
        :value="nowNumber"
        outlined
        dense
        prepend-icon="mdi-credit-card"
        label="Number"
        inputmode="numeric"
        type="text"
        name="cc-number"
        autocomplete="cc-number"
        :rules="rules"
        @change="updateNumber"
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    nowNumber: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      number: '',
      rules: [
        (v) => !!v || '必須項目です',
        (v) => (!!v && v.length === 16) || `16桁で入力してください`,
      ],
    }
  },
  methods: {
    updateNumber(number) {
      this.$emit('updateChildNumber', number)
    },
  },
}
</script>
