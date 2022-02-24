<template>
  <div class="info">
      <span class="title">Information</span>
      <p class="text">Flags left: 
         <span class="value flags-left">{{ flagsLeft }}</span>
      </p>
      <p class="text">
         Elapsed time: <span class="value elapsed-time">
            <Stopwatch :isRunning="false" />
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
      flagsLeft: { type: Number, required: true },
      personalBest: { type: String }
   },
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';
   .info {
      padding-bottom: 15px;
      border-bottom: 1px solid $light-gray;
      .title {
         font-size: 24px;
         font-weight: 400;
         text-align: center;
         display: block;
      }

      .text {
         margin-bottom: 5px;
         color: $text-color;
         font-size: 18px;
      }
      .value {
         font-family: 'Share Tech Mono', sans-serif;
      }
      .sub-info {
         color: darken($light-gray, 30%);
      }
      // .alert-message {
      //    color: #b51a1a;
      //    font-weight: bold;
      //    font-size: 12px;
      //    padding-left: 10px;
      // }
   }
</style>