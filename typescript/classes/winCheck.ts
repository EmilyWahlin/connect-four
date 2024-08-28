import Board from "./board.js";

export default class winCheck {
  board: Board;


  constructor(board: Board) {
    this.board = board
  }

  checkForWin(): string | boolean {
    // gB - short for gameboard
    const gB = this.board.board;
    let offsets = [
            [[0, 0], [0, 1], [0, 2]],  // horizontal win
            [[0, 0], [1, 0], [2, 0]],  // vertical win
            [[0, 0], [1, 1], [2, 2]],  // diagonal 1 win
            [[0, 0], [1, -1], [2, -2]] // diagonal 2 win
        ];
  for (let token of ['X', 'O']) {
      // Traverse the board
      for (let r = 0; r < gB.length; r++) {
        for (let c = 0; c < gB[0].length; c++) {
          // Check each win pattern (horizontal, vertical, diagonal1, diagonal2)
          for (let winType of offsets) {
            let tokensInCombo = '';
            // Check each direction within the current pattern
            for (let [ro, co] of winType) {
              const newRow = r + ro;
              const newCol = c + co;
              // Ensure we're within the bounds of the board
              if (newRow >= 0 && newRow < gB.length && newCol >= 0 && newCol < gB[0].length) {
                tokensInCombo += gB[newRow][newCol];
              }
            }
            // If we find four consecutive tokens, return the winner
            if (tokensInCombo === token.repeat(4)) {
              return token;  // Return 'X' or 'O'
            }
          }
        }
      }
    }
    return false;  // No winner found
  }
}
