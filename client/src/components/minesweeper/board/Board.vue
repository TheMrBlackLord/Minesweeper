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
      />
   </div>
   </div>
</template>

<script>
import Cell from './Cell.vue'
export default {
   name: 'Game Board',
   components: { Cell },
   props: {
      difficulty: {type: Object, required: true},
   },
   methods: {},
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
