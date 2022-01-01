<template>
  <v-row>
    <v-col>
      <v-text-field
        :value="nowName"
        outlined
        dense
        prepend-icon="mdi-pen"
        label="Name"
        :rules="rules"
        @change="updateName"
      >
        name
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    nowName: {
      type: String,
      default: '',
    },
  },
  data() {
    const max = 20
    return {
      name: '',
      max,
      rules: [
        (v) => !!v || '必須項目です',
        (v) => (!!v && max >= v.length) || `${max}文字以内で入力してください`,
      ],
    }
  },
  methods: {
    updateName(name) {
      this.$emit('updateChildName', name)
    },
  },
}
</script>
