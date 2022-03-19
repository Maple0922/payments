<template>
  <v-row>
    <v-col class="py-0">
      <v-color-picker
        hide-canvas
        hide-inputs
        hide-sliders
        show-swatches
        swatches-max-height="100px"
        class="mx-auto mb-4"
        width="100%"
        style="max-width: none"
        :value="nowColor"
        @input="updateColor"
      >
      </v-color-picker>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    nowColor: {
      type: String,
      default: Math.random().toString(16).slice(-6),
    },
  },
  data() {
    const max = 20
    return {
      color: '',
      max,
    }
  },
  methods: {
    updateColor(color) {
      this.$emit('updateChildColor', color)
    },
  },
}
</script>
