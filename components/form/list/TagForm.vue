<template>
  <v-row align="center" justify="start" class="flex-nowrap overflow-x-hidden">
    <v-col class="py-0">
      <v-row class="pa-3">
        <v-col class="col-left icon d-flex align-center justify-center">
          <v-icon>mdi-tag</v-icon>
        </v-col>
        <v-col class="col-right py-0 px-1 overflow-x-scroll">
          <v-chip-group
            v-if="tags"
            :value="nowTag"
            class="overflow-x-scroll"
            active-class="white--text"
            mandatory
            @change="updateTag"
          >
            <v-chip
              v-for="(tag, key) in tags"
              :key="key"
              filter
              dark
              :color="tag.color"
              class="ma-0 mr-1"
              :value="tag.uid"
              >{{ tag.name }}</v-chip
            >
          </v-chip-group>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { getAuth } from 'firebase/auth'
import { getFirestore, getDocs, collection } from 'firebase/firestore'

export default {
  props: {
    nowTag: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tags: [],
    }
  },
  mounted() {
    this.getTags()
  },
  methods: {
    async getTags() {
      const user = getAuth().currentUser
      const db = getFirestore()
      const tagsSnapshot = await getDocs(
        collection(db, 'users', user.uid, 'tags')
      )

      this.tags = await Promise.all(
        tagsSnapshot.docs
          .map((tagDoc) => {
            return {
              uid: tagDoc.id,
              data: tagDoc.data(),
            }
          })
          .map((tag) => {
            return {
              uid: tag.uid,
              name: tag.data.name,
              color: `#${tag.data.color}`,
            }
          })
      )
    },
    updateTag(tag) {
      this.$emit('updateChildTag', tag)
    },
  },
}
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
  padding: 4px;
  flex-grow: 0;
}

.col-right {
  flex-basis: auto;
  width: calc(100% - 30px);
}

.col-left {
  flex-basis: auto;
  width: 30px;
}
</style>
