import Board from "./board.js";
import WinCheck from "./winCheck.js";


  // Method to make a move
  export default class MakeMove {
  board: Board;
  currentPlayerToken: 'X' | 'O';
  gameOver: boolean;
  winner: 'X' | 'O' | null;
  isADraw: boolean;

  constructor(board: Board) {
    this.board = board;
    this.currentPlayerToken = 'X'; // Start with player X
    this.gameOver = false;
    this.winner = null;
    this.isADraw = false;
  }

  // Method to make a move
  makeMove(token: 'X' | 'O', column: number): { success: boolean; reason?: string } {
    // Check if the game is over
    if (this.gameOver) return { success: false, reason: 'Game over' };

    // Ensure the move is from the correct player
    if (token !== this.currentPlayerToken) return { success: false, reason: 'Not your turn' };

    // Ensure column is within bounds
    if (column < 0 || column >= this.board.columns) return { success: false, reason: 'Invalid column' };

    // Find the first available row in the selected column
    let row = -1;
    for (let r = this.board.rows - 1; r >= 0; r--) {
      if (this.board.board[r][column] === ' ') {
        row = r;
        break;
      }
    }

    // Ensure the column is not full
    if (row === -1) return { success: false, reason: 'Column full' };

    // Place the player's token in the selected column
    this.board.board[row][column] = token;

    // Check for a winner or a draw after making the move
    const winChecker = new WinCheck(this.board);
    const winnerCheckResult = winChecker.checkForWin();

    if (winnerCheckResult) {
      this.winner = winnerCheckResult as 'X' | 'O';
      this.gameOver = true;
      return { success: true };
    } else if (this.drawCheck()) {
      this.isADraw = true;
      this.gameOver = true;
      return { success: true };
    } else {
      // Switch to the next player's turn
      this.currentPlayerToken = this.currentPlayerToken === 'X' ? 'O' : 'X';
      return { success: true };
    }
  }

  // Method to check if the game is a draw (no empty spaces left)
  drawCheck(): boolean {
    return this.board.board.flat().every(cell => cell !== ' ');
  }
}