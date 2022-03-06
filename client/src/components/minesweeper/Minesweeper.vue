<template>
  <section class="game-section">
     <div class="row">
        <div class="col-md-4">
           <Info ref="info"
               :flagsLeft="flagsLeft" 
               />
           <Controls 
               :difficulties="difficulties"
               :isGameStarted="isGameStarted"
               :isGamePaused="isGamePaused"
               @difficultyChanged="difficultyChanged"
               @restartGame="restartGame"
               @pauseGame="pauseGame"
            />
        </div>
        <div class="col-md-8">
           <Board 
               :difficulty="difficulties[difficulty]"
               :isGameStarted="isGameStarted"
               :usedFlags="usedFlags"
               @startGame="isGameStarted = true"
               @removeFlag="usedFlags--"
               @placeFlag="usedFlags++"
            >
               <template #result>
                  <ResultPanel :isVictory="true"/>
               </template>
            </Board>
        </div>
     </div>
  </section>
</template>

<script>
import Board from './board/Board.vue'
import ResultPanel from './board/ResultPanel.vue'
import Info from './Info.vue'
import Controls from './Controls.vue'
import { mapGetters } from 'vuex'
import { computed } from 'vue'

export default {
   name: 'Game',
   components: { Board, Info, Controls, ResultPanel },
   data() {
      return {
         isGameStarted: false,
         isGamePaused: false,
         difficulty: 'easy',
         usedFlags: 0
      }
   },
   provide() {
      return {
         isStopwachRunning: computed(() => this.isGameStarted && !this.isGamePaused),
         isPause: computed(() => this.isGamePaused),
      }
   },
   methods: {
      difficultyChanged(difficulty) {
         this.difficulty = difficulty
         this.restartGame()
      },
      restartGame() {
         this.isGameStarted = false
         this.isGamePaused = false
         this.$refs.info.resetStopwatch()
         this.usedFlags = 0
      },
      pauseGame() {
         this.isGamePaused = !this.isGamePaused
      }
   },
   computed: {
      ...mapGetters(['difficulties']),
      flagsLeft() {
         const left = this.difficulties[this.difficulty].bombs - this.usedFlags
         return left > 0 ? left : 0
      }
   },
}
</script>
