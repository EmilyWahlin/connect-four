import Board from "./board.js";
// import { winCheck } from './WinChecker.js';

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
  makeMove(token: 'X' | 'O', column: number): boolean {
    // Check if the game is over
    if (this.gameOver) { return false; }

    // Ensure the move is from the correct player
    if (token !== this.currentPlayerToken) { return false; }

    // Ensure column is within bounds
    if (column < 0 || column >= this.board.columns) { return false; }

    // Find the first available row in the selected column
    let row = -1;
    for (let r = this.board.rows - 1; r >= 0; r--) {
      if (this.board.board[r][column] === ' ') {
        row = r;
        break;
      }
    }

    // Ensure the column is not full
    if (row === -1) { return false; }

    // Make the move by placing the player's token in the matrix
    this.board.board[row][column] = token;

    // Check for a winner or a draw after making the move
    this.winner = winCheck(this.board.board, token, row, column);
    this.isADraw = this.drawCheck();

    // Mark the game as over if there's a winner or a draw
    this.gameOver = this.winner !== null || this.isADraw;

    // Switch to the next player's turn
    this.currentPlayerToken = this.currentPlayerToken === 'X' ? 'O' : 'X';

    return true; // Move was successfully made
  }

  // Method to check if the game is a draw (no empty spaces left)
  drawCheck(): boolean {
    return this.board.board.flat().every(cell => cell !== ' ');
  }
}