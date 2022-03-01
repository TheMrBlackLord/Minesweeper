module.exports = {
   getMatrixPosFromIndex(index, size) {
      const row = Math.floor(index / size)
      const col = index % size
      return {row, col}
    }
}
