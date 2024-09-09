import Board from "./board.js";

export default class WinCheck {
  board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  checkForWin(): string | boolean {
    const gB = this.board.board;  // game board grid

    const directions = [
      { r: 0, c: 1 },  // horizontal
      { r: 1, c: 0 },  // vertical
      { r: 1, c: 1 },  // diagonal down-right
      { r: 1, c: -1 }  // diagonal down-left
    ];

    // Check for win by looping through each cell in the grid
    for (let r = 0; r < gB.length; r++) {
      for (let c = 0; c < gB[0].length; c++) {
        if (gB[r][c] === ' ') continue;  // Skip empty cells

        const currentToken = gB[r][c];

        // Check in all directions for 4 consecutive tokens
        for (let { r: dr, c: dc } of directions) {
          let count = 1;

          for (let i = 1; i < 4; i++) {
            const newRow = r + dr * i;
            const newCol = c + dc * i;

            // Ensure we're within bounds and matching the current player's token
            if (
              newRow >= 0 &&
              newRow < gB.length &&
              newCol >= 0 &&
              newCol < gB[0].length &&
              gB[newRow][newCol] === currentToken
            ) {
              count++;
            } else {
              break;
            }

            // If 4 consecutive tokens are found, return the winner
            if (count === 4) {
              return currentToken;  // Return 'X' or 'O'
            }
          }
        }
      }
    }

    return false;  // No winner found
  }
}
