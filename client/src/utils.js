import { chunk, fill } from 'lodash'
import moment from 'moment'

export function getMatrixPosFromIndex(index, size) {
   const row = Math.floor(index / size)
   const col = index % size
   return {row, col}
}

export function getFilledMatrix(size, filler) {
   return chunk(fill(Array(size * size), filler), size)
}

export function randomInteger(max, min = 0) {
   return Math.floor(Math.random() * (max - min)) + min;
}

export function calculateBombs(grid) {
   const size = grid[0].length
   for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
         let count = 0
         if (grid[i][j] === 'x') continue
         if (i > 0) {
            if (grid[i - 1][j - 1] === 'x') count++
            if (grid[i - 1][j] === 'x') count++
            if (grid[i - 1][j + 1] === 'x') count++
         }
         
         if (j > 0)
            if (grid[i][j - 1] === 'x') count++
         if (j < size - 1)
            if (grid[i][j + 1] === 'x') count++

         if (i < size - 1) {
            if (grid[i + 1][j - 1] === 'x') count++
            if (grid[i + 1][j] === 'x') count++
            if (grid[i + 1][j + 1] === 'x') count++
         }
         grid[i][j] = count
      }
   }
   return grid
}

export function getTime(time) {
   return moment.utc(time * 1000).format('HH:mm:ss')
}
