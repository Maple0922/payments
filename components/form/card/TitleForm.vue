<template>
  <v-row>
    <v-col class="py-0">
      <v-text-field
        :value="nowTitle"
        outlined
        dense
        prepend-icon="mdi-pen"
        label="Title"
        :rules="rules"
        @change="updateTitle"
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    nowTitle: {
      type: String,
      default: '',
    },
  },
  data() {
    const max = 20
    return {
      title: '',
      max,
      rules: [
        (v) => !!v || '必須項目です',
        (v) => (!!v && max >= v.length) || `${max}文字以内で入力してください`,
      ],
    }
  },
  methods: {
    updateTitle(title) {
      this.$emit('updateChildTitle', title)
    },
  },
}
</script>
