<template>
  <v-row>
    <v-col class="py-0">
      <v-text-field
        :value="nowPrice"
        outlined
        dense
        prepend-icon="mdi-cash-multiple"
        label="Price"
        :rules="rules"
        @change="updatePrice"
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    nowPrice: {
      type: String,
      default: '0',
    },
  },
  data() {
    const max = 6
    return {
      rules: [
        (v) => !!v || '必須項目です',
        (v) => Number.isInteger(Number(v)) || '整数を入力してください',
        (v) =>
          max >= Math.abs(v).toString().length ||
          `${max}桁以内で入力してください`,
      ],
    }
  },
  methods: {
    updatePrice(price) {
      this.$emit('updateChildPrice', price)
    },
  },
}
</script>
