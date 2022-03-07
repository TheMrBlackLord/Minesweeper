<template>
  <div class="cell"
      @click.left="cellClicked"
      @click.right.prevent="toggleFlag"
      :class="{
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
      isFlagPlaced: {type: Boolean, required: true},
   },
   inject: ['isPause'],
   data() {
      return {
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
         if (!this.isFlagPlaced && !this.isRevealed && !this.isPause)
            this.$emit('cellClicked', this.id)
      },
      removeFlag() {
         this.$emit('removeFlag', this.id)
      },
      placeFlag() {
         this.$emit('placeFlag', this.id)
      },
      toggleFlag() {
         if (this.isFlagPlaced && !this.isPause)
            this.removeFlag()
         else if (!this.isRevealed && !this.isPause)
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
