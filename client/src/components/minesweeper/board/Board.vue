<template>
   <div class="minesweeper-grid"
   :style="{
      width: gridStyleSize,
      height: gridStyleSize,
      fontSize: difficulty.fontSize + 'px'
   }"
   >
   <div class="cells">
      <Cell v-for="i in gridSize" :key="i"
         :style="{
            width: difficulty.cellSize + 'px',
            height: difficulty.cellSize + 'px',
         }"
         :id="i-1"
         @cellClicked="cellClicked"
      />
   </div>
   </div>
</template>

<script>
import Cell from './Cell.vue'
import { getMatrixPosFromIndex } from '../../../utils'

export default {
   name: 'Game Board',
   components: { Cell },
   props: {
      difficulty: {type: Object, required: true},
      isGameStarted: {type: Boolean, required: true},
   },
   data() {
      return {
         startPos: {row: 0, col: 0}
      }
   },
   methods: {
      cellClicked(id) {
         if (!this.isGameStarted) this.startGame(id)
      },
      startGame(id) {
         this.$emit('startGame')
         const size = this.difficulty.size
         this.startPos = getMatrixPosFromIndex(id, size)
         console.log(this.startPos)
      },
   },
   computed: {
      gridSize() {
         return Math.pow(this.difficulty.size, 2)
      },
      gridStyleSize() {
         const { size, cellSize } = this.difficulty
         const borderWidth = 20 // 10px left + 10px right / top and bottom
         return `${size * cellSize + borderWidth}px`
      }
   },
};
</script>
