<template>
  <div class="result-background">
     <h3 class="title">{{title}}</h3>
     <button class="btn btn-success btn-lg" @click="$emit('playAgain')">Play again</button>
  </div>
</template>

<script>
export default {
   props: {
      isVictory: {type: Boolean, required: true}
   },
   computed: {
      title() {
         return this.isVictory ? 'Victory' : 'Defeat'
      }
   }
}
</script>
