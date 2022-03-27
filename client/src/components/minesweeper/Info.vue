<template>
  <div class="info">
      <span class="title">Information</span>
      <p class="text">Flags left: 
         <span class="value flags-left">{{ flagsLeft }}</span>
      </p>
      <p class="text">
         Elapsed time: <span class="value elapsed-time">
            <Stopwatch ref="stopwatch" />
         </span>
      </p>
      <p class="sub-info" v-if="user">
         Personal best:
         <span class="value personal-best">{{ bestTime }}</span>
      </p>
   </div>
</template>

<script>
import Stopwatch from './Stopwatch.vue'
import { formatTime } from '../../utils'
import { mapGetters } from 'vuex'

export default {
   name: 'Game info',
   components: { Stopwatch },
   props: {
      flagsLeft: { type: Number, required: true },
      personalBest: { type: Number, default: 0 }
   },
   methods: {
      resetStopwatch() {
         this.$refs.stopwatch.reset()
      },
      getTime() {
         return this.$refs.stopwatch.getTime()
      }
   },
   computed: {
      bestTime() {
         return formatTime(this.personalBest)
      },
      ...mapGetters(['user'])
   }
}
</script>
