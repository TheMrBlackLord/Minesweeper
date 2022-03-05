<template>
  <div class="cell"
      @click.left="cellClicked"
      @click.right.prevent="toggleFlag"
      :class="{
         x: cell === 'x',
         revealed: isRevealed,
         [this.colors[cell-1]]: showColor,
         }"
  >
     <span>{{value}}</span>
  </div>
</template>

<script>
export default {
   name: 'Cell',
   props: {
      id: {type: Number, required: true},
      cell: {type: [String, Number], required: true},
      isRevealed: {type: Boolean, required: true},
   },
   data() {
      return {
         isFlagPlaced: false,
         colors: ['blue', 'green', 'yellow', 'orange', 'red', 'yellowHighlight', 'orangeHighlight', 'redHighlight']
      }
   },
   watch: {
      // remove flag when cell is auto revealed
      isRevealed(value) {
         if (this.isFlagPlaced && value) this.removeFlag()
      }
   },
   methods: {
      cellClicked() {
         if (!this.isFlagPlaced && !this.isRevealed)
            this.$emit('cellClicked', this.id)
      },
      removeFlag() {
         this.isFlagPlaced = false
         this.$emit('flagRemoved')
      },
      placeFlag() {
         this.isFlagPlaced = true
         this.$emit('flagPlaced', this.id)
      },
      toggleFlag() {
         if (this.isFlagPlaced)
            this.removeFlag()
         else if (!this.isRevealed)
            this.placeFlag()
      }
   },
   computed: {
      value() {
         if (this.cell === 'x' && this.isRevealed) return '💣'
         if (this.isFlagPlaced) return '🚩'
         return this.isRevealed && this.cell > 0 ? this.cell : ''
      },
      showColor() {
         return this.isRevealed && this.cell > 0
      }
   }
}
</script>

<style>
   .x {
      background: rgba(255, 0, 0, 0.473) !important;
   }
</style>
