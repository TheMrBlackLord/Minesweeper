<template>
  <section class="game-section">
     <div class="row">
        <div class="col-md-4">
           <Info ref="info"
               :flagsLeft="flagsLeft"
               :personalBest="personalBest"
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
               @flagRemoved="usedFlags--"
               @flagPlaced="usedFlags++"
               @victory="victory"
               @defeat="defeat"
            >
               <template #result>
                  <ResultPanel
                     v-if="isGameFinished"
                     @playAgain="restartGame"
                     :isVictory="isVictory"
                  />
               </template>
            </Board>
        </div>
     </div>
     <div class="row justify-content-center my-4">
        <div class="col-8">
           <Leaders />
        </div>
     </div>
  </section>
</template>

<script>
import Board from './board/Board.vue'
import ResultPanel from './board/ResultPanel.vue'
import Info from './Info.vue'
import Controls from './Controls.vue'
import Leaders from './Leaders.vue'
import { mapGetters } from 'vuex'
import { computed } from 'vue'
import api from '../../../http/api'

export default {
   name: 'Game',
   components: { Board, Info, Controls, ResultPanel, Leaders },
   data() {
      return {
         isGameStarted: false,
         isGamePaused: false,
         isGameFinished: false,
         difficulty: 'easy',
         usedFlags: 0,
         isVictory: false,
         personalBest: null
      }
   },
   provide() {
      return {
         isStopwachRunning: computed(() => {
            return this.isGameStarted && !this.isGamePaused && !this.isGameFinished
         }),
         isPause: computed(() => this.isGamePaused),
      }
   },
   async mounted() {
      if (this.user) {
         const { data } = await api.get(`user/gameData/${this.user.id}`)
         if (data.personalBest < Number.MAX_SAFE_INTEGER) {
            this.personalBest = data.personalBest
         }
      }
   },
   methods: {
      difficultyChanged(difficulty) {
         this.difficulty = difficulty
         this.restartGame()
      },
      restartGame() {
         this.isGameFinished = false
         this.isGameStarted = false
         this.isGamePaused = false
         this.$refs.info.resetStopwatch()
         this.usedFlags = 0
         this.isVictory = false
      },
      async victory() {
         this.isGameFinished = true
         this.isVictory = true
         if (this.user) {
            await this.$store.dispatch('win', {
               difficulty: this.difficulty,
               time: this.$refs.info.getTime()
            })
         }
      },
      async defeat() {
         this.isGameFinished = true
         if (this.user) {
            await this.$store.dispatch('defeat', {
               difficulty: this.difficulty,
               time: this.$refs.info.getTime()
            })
         }
      },
      pauseGame() {
         this.isGamePaused = !this.isGamePaused
      }
   },
   computed: {
      ...mapGetters(['difficulties', 'user']),
      flagsLeft() {
         const left = this.difficulties[this.difficulty].bombs - this.usedFlags
         return left > 0 ? left : 0
      }
   },
}
</script>
