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
            :cell="getCellFromIndex(i-1)"
            :isRevealed="getCellStateFromIndex(i-1, cellsState)"
            :isFlagPlaced="getCellStateFromIndex(i-1, cellsFlagged)"
            @cellClicked="cellClicked"
            @removeFlag="removeFlag"
            @placeFlag="placeFlag"
         />
      </div>
      <slot name="result"></slot>
   </div>
</template>

<script>
import Cell from './Cell.vue'
import { isEqual, inRange } from 'lodash'
import { 
      getMatrixPosFromIndex,
      calculateBombs,
      randomInteger,
      getFilledMatrix
   } from '../../../utils'
export default {
   name: 'Game Board',
   components: { Cell },
   props: {
      difficulty: {type: Object, required: true},
      usedFlags: {type: Number, required: true},
      isGameStarted: {type: Boolean, required: true},
   },
   data() {
      return {
         startPos: {row: 0, col: 0},
         cellsState: this.createCellsState(),
         cellsFlagged: this.createCellsState(),
         openedCells: 0,
      }
   },
   watch: {
      difficulty() {
         this.restart()
      },
      isGameStarted() {
         this.restart()
      },
      isVictory() {
         if (this.isGameStarted)
            this.$emit('victory')
      }
   },
   methods: {
      cellClicked(id) {
         if (!this.isGameStarted) this.startGame(id)
         const { row, col } = getMatrixPosFromIndex(id, this.difficulty.size)
         setTimeout(() => { // FIXME: remove timeout and fix bug with computed
            this.revealNearbyCells(row, col)
         }, 0)
         if (this.board[row][col] === 'x') {
            this.revealAllCells()
            this.$emit('defeat')
         }
      },
      revealAllCells() {
         const size = this.difficulty.size
         for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
               if (this.cellsState[row][col] === false) {
                  this.cellsState[row][col] = true
               }
            }
         }
      },
      revealNearbyCells(row, col) {
         const size = this.difficulty.size
         if (inRange(row, 0, size) && inRange(col, 0, size) &&
            !this.cellsState[row][col]) {
            if (this.board[row][col] !== 'x') {
               this.cellsState[row][col] = true
               this.openedCells++
            }
            if (this.board[row][col] === 0) {
               // check nearby empty cells on the left, right, above, below
               this.revealNearbyCells(row, col-1)
               this.revealNearbyCells(row, col+1)
               this.revealNearbyCells(row+1, col)
               this.revealNearbyCells(row-1, col)
               // diagonal
               this.revealNearbyCells(row+1, col+1)
               this.revealNearbyCells(row-1, col-1)
               this.revealNearbyCells(row+1, col-1)
               this.revealNearbyCells(row-1, col+1)
            }
         }
      },
      startGame(id) {
         this.$emit('startGame')
         this.startPos = getMatrixPosFromIndex(id, this.difficulty.size)
      },
      restart() {
         this.cellsState = this.createCellsState()
         this.cellsFlagged = this.createCellsState()
         this.openedCells = 0
         this.$forceUpdate()
      },
      removeFlag(id) {
         const { row, col } = getMatrixPosFromIndex(id, this.difficulty.size)
         this.cellsFlagged[row][col] = false
         this.$emit('flagRemoved')
      },
      placeFlag(id) {
         if (this.isGameStarted) {
            const { row, col } = getMatrixPosFromIndex(id, this.difficulty.size)
            this.cellsFlagged[row][col] = true
            this.$emit('flagPlaced')
         }
      },
      getCellFromIndex(index) {
         const { row, col } = getMatrixPosFromIndex(index, this.difficulty.size)
         return this.board[row][col]
      },
      getCellStateFromIndex(index, state) {
         const { row, col } = getMatrixPosFromIndex(index, this.difficulty.size)
         return state[row][col]
      },
      createCellsState() {
         // all cells are not revealed by default
         return getFilledMatrix(this.difficulty.size, false)
      }
   },
   computed: {
      gridSize() {
         return Math.pow(this.difficulty.size, 2)
      },
      gridStyleSize() {
         const { size, cellSize } = this.difficulty
         const borderWidth = 20 // 10px left + 10px right / top and bottom
         return `${size * cellSize + borderWidth}px`
      },
      isVictory() {
         const bombs = this.difficulty.bombs
         return this.gridSize - this.openedCells === bombs && this.usedFlags === bombs
      },
      board() {
         const size = this.difficulty.size
         let gameBoard = getFilledMatrix(size, 0)
         if (!this.isGameStarted) return gameBoard
         // add bombs
         let bombsPlaced = 0
         while (bombsPlaced < this.difficulty.bombs) {
            let row = randomInteger(size),
                col = randomInteger(size)
            if (gameBoard[row][col] != 'x' && !isEqual(this.startPos, {row, col})) {
               gameBoard[row][col] = 'x'
               bombsPlaced++
            }
         }
         gameBoard = calculateBombs(gameBoard, size)
         return gameBoard
      }
   },
};
</script>
