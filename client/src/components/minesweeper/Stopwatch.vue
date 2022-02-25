<template>
   <span class="time">{{ time }}</span>
</template>

<script>
export default {
   props: {
      isRunning: {type: Boolean, required: true}
   },
   data() {
      return {
         elapsed: 0,
         interval: null
      }
   },
   computed: {
      time() {
         return this.hours + ':' + this.minutes + ':' + this.seconds
      },
      hours() {
         let hrs = Math.floor((this.elapsed / 60 / 60))
         return hrs >= 10 ? hrs : '0' + hrs
      },
      minutes() {
         let min = Math.floor((this.elapsed / 60) % 60)
         return min >= 10 ? min : '0' + min
      },
      seconds() {
         let sec = Math.floor(this.elapsed % 60)
         return sec >= 10 ? sec : '0' + sec
      }
   },
   mounted() {
      if (this.isRunning) {
         this.startInterval()
      }
   },
   methods: {
      updateCurrentTime() {
         this.elapsed++
      },
      reset() {
         this.elapsed = 0
      },
      startInterval() {
         this.interval = setInterval(this.updateCurrentTime, 1000)
      }
   },
   watch: {
      isRunning(value) {
         if (value) {
            this.startInterval()
         } else {
            clearInterval(this.interval)
         }
      },
   }
}
</script>
