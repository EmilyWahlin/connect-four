import Board from "./Board.js";
import MakeMove from "./MakeMove.js";
import Player from "./Player.js";
import prompt from "../helpers/prompt.js";

export default class Game {
  board: Board;
  makeMove: MakeMove;
  playerX!: Player;  // Use non-null assertion
  playerO!: Player;  // Use non-null assertion

  constructor() {
    while (true) {
      this.createPlayers();      // Create players
      this.board = new Board();  // Initialize a new board
      this.makeMove = new MakeMove(this.board);  // Initialize MakeMove with the new board

      this.startGameLoop();      // Start the game loop
      this.whoHasWonOnGameOver();  // Check who won and display the result

      console.log('');
      let playAgain = prompt('Do you want to play again? (yes/no)? ');
      if (playAgain.toLowerCase() !== 'yes') {
        break;  // End the loop if the user doesn't want to play again
      }
    }
  }

  createPlayers() {
    console.clear();
    console.log('Connect Four!\n');
    this.playerX = new Player(prompt('Player X\'s name: '), 'X');
    this.playerO = new Player(prompt('Player O\'s name: '), 'O');
  }

  startGameLoop() {
    // Game loop - runs until the game is over
    while (!this.makeMove.gameOver) {  // Now checks gameOver from MakeMove
      console.clear();
      this.board.displayBoard();  // Assuming displayBoard renders the current board

      let currentPlayer = this.makeMove.currentPlayerToken === 'X'
        ? this.playerX
        : this.playerO;

      let move = prompt(`Your move ${currentPlayer.token} (${currentPlayer.name}) - enter column (1-${this.board.columns}): `);

      // Convert column input to zero-based index
      let column = +move.trim() - 1;

      // Try to make the move via MakeMove
      let moveSuccess = this.makeMove.makeMove(currentPlayer.token, column);

      if (!moveSuccess) {
        console.log('Invalid move, please try again.');
      }
    }
  }

  whoHasWonOnGameOver() {
    // The game is over, announce the result
    console.clear();
    this.board.displayBoard();  // Display the final board state

    if (this.makeMove.winner) {  // Use MakeMove to determine the winner
      let winningPlayer = this.makeMove.winner === 'X' ? this.playerX : this.playerO;
      console.log(`Woohoo! ${winningPlayer.token}: ${winningPlayer.name}, you won!`);
    } else if (this.makeMove.isADraw) {
      console.log('It\'s a tie!');
    }
  }
}