<template>
  <div class="controls">
     <div class="diff-select">
        <select class="form-select difficulty" @change="diffucultyChange">
            <option
               v-for="[diff, {size, bombs}] of Object.entries(difficulties)"
               :key="diff" :value="diff">
                  {{diff}} {{size}}x{{size}} / {{bombs}}
            </option>
         </select>
      </div>
      <div class="control-btns">
         <button class="btn btn-primary" :disabled="!isGameStarted">
            <img src="../../assets/svg/replay.svg" alt="replay">
         </button>
         <button class="btn btn-primary" :disabled="!isGamePaused">
            <img v-if="!isGamePaused" src="../../assets/svg/pause.svg" alt="pause">
            <img v-else src="../../assets/svg/play.svg" alt="play">
         </button>
      </div>
  </div>
</template>

<script>

export default {
   name: 'Controls',
   components: {
   },
   props: {
      difficulties: {type: Object, required: true},
      isGameStarted: {type: Boolean, required: true},
      isGamePaused: {type: Boolean, required: true},
   },
   methods: {
      diffucultyChange(e) {
         this.$emit('difficultyChanged', e.target.value)
      }
   },
}
</script>
