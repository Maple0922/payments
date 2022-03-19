<template>
  <v-row>
    <v-col class="py-0">
      <v-text-field
        :value="nowSecurityCode"
        outlined
        dense
        prepend-icon="mdi-key-variant"
        label="SecurityCode"
        inputmode="numeric"
        :rules="rules"
        type="text"
        name="cc-csc"
        autocomplete="cc-csc"
        @change="updateSecurityCode"
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    nowSecurityCode: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      securityCode: '',
      rules: [
        (v) => !!v || '必須項目です',
        (v) =>
          (!!v && [3, 4].includes(v.length)) || `3桁か4桁で入力してください`,
      ],
    }
  },
  methods: {
    updateSecurityCode(securityCode) {
      this.$emit('updateChildSecurityCode', securityCode)
    },
  },
}
</script>
