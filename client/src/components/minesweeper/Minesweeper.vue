<template>
  <section class="game-section">
     <div class="row">
        <div class="col-lg-4">
           <Info />
           <Controls />
        </div>
        <div class="col-lg-8">
           <Board />
        </div>
     </div>
  </section>
</template>

<script>
import Board from './Board.vue'
import Info from './Info.vue'
import Controls from './Controls.vue'
export default {
   name: 'Game Board',
   components: { Board, Info, Controls }
}
</script>

<style>

</style>