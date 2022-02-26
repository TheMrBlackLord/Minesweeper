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
      <button class="btn btn-primary restart-game" :disabled="!isGameStarted">Restart Game</button>
  </div>
</template>

<script>
export default {
   name: 'Controls',
   props: {
      difficulties: {type: Object, required: true},
      isGameStarted: {type: Boolean, required: true},
   },
   methods: {
      diffucultyChange(e) {
         this.$emit('difficultyChanged', e.target.value)
      }
   },
}
</script>
