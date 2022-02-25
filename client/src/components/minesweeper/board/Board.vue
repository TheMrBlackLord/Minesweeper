<template>
  <div class="game-board">
    <div class="minesweeper-grid">
      <div class="cells">
        <Cell v-for="i in 100" :key="i"/>
      </div>
    </div>
  </div>
</template>

<script>
import Cell from './Cell.vue'
export default {
   name: 'Game Board',
   components: { Cell },
};
</script>

<style scoped>
   .minesweeper-grid {
      width: 420px;
      height: 420px;
   }
</style>