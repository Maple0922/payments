<template>
  <v-row>
    <v-col>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            label="Date"
            prepend-icon="mdi-calendar"
            readonly
            outlined
            dense
            :value="nowDate"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker @change="updateDate"></v-date-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    nowDate: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      menu: false,
    }
  },
  methods: {
    updateDate(date) {
      this.menu = false
      this.$emit('updateChildDate', date)
    },
  },
}
</script>
