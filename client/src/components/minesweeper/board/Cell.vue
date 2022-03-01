<template>
  <div class="cell"
  @click.left="cellClicked"
  @click.right.prevent="flagHandler">
     <span class="num"></span>
  </div>
</template>

<script>
export default {
   name: 'Cell',
   props: {
      id: {type: Number, required: true},
   },
   data() {
      return {
         flagPlaced: false
      }
   },
   methods: {
      cellClicked() {
         if (!this.flagPlaced) // TODO: check if cell is not open
            this.$emit('cellClicked', this.id)
      },
      removeFlag() {},
      placeFlag() {},
      flagHandler() {}
   },
}
</script>
