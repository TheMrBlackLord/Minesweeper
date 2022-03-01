<template>
  <section class="game-section">
     <div class="row">
        <div class="col-md-4">
           <Info :flagsLeft="flagsLeft" 
               :isStopwachRunning="isGameStarted && !isGamePaused"/>
           <Controls 
               :difficulties="difficulties"
               :isGameStarted="isGameStarted"
               @difficultyChanged="difficultyChanged"
            />
        </div>
        <div class="col-md-8">
           <Board 
               :difficulty="difficulties[difficulty]"
               :isGameStarted="isGameStarted"
               @startGame="isGameStarted = true"
            />
        </div>
     </div>
  </section>
</template>

<script>
import Board from './board/Board.vue'
import Info from './Info.vue'
import Controls from './Controls.vue'
import { mapGetters } from 'vuex'

export default {
   name: 'Game',
   components: { Board, Info, Controls },
   data() {
      return {
         isGameStarted: false,
         isGamePaused: false,
         difficulty: 'easy',
         countOfUsedFlags: 0,
      }
   },
   methods: {
      difficultyChanged(difficulty) {
         this.difficulty = difficulty
      }
   },
   computed: {
      ...mapGetters(['difficulties']),
      flagsLeft() {
         const left = this.difficulties[this.difficulty].bombs - this.countOfUsedFlags
         return left > 0 ? left : 0
      }
   },
}
</script>
