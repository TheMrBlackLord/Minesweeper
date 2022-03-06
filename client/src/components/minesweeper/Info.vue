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
      <p class="sub-info">
         Personal best:
         <span class="value personal-best">{{ personalBest || "00:05:00" }}</span>
      </p>
   </div>
</template>

<script>
import Stopwatch from './Stopwatch.vue'
export default {
   name: 'Game info',
   components: { Stopwatch },
   props: {
      flagsLeft: {type: Number, required: true},
      personalBest: { type: String }
   },
   methods: {
      resetStopwatch() {
         this.$refs.stopwatch.reset()
      }
   }
}
</script>
