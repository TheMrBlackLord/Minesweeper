<template>
  <div class="game-board">
    <div class="minesweeper-grid">
      <div class="cells">
        <Cell />
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

<style>
</style>