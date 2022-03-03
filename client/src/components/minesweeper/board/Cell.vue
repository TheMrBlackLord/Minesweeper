<template>
  <div class="cell"
      @click.left="cellClicked"
      @click.right.prevent="flagHandler"
      :class="{revealed: isRevealed}"
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
         isFlagPlaced: false
      }
   },
   methods: {
      cellClicked() {
         if (!this.isFlagPlaced && !this.isRevealed)
            this.$emit('cellClicked', this.id)
      },
      removeFlag() {},
      placeFlag() {},
      flagHandler() {}
   },
   computed: {
      value() {
         if (this.cell === 'x' && this.isRevealed) return '💣'
         if (this.isFlagPlaced) return '🚩'
         return this.isRevealed && this.cell > 0 ? this.cell : ''
      }
   }
}
</script>
