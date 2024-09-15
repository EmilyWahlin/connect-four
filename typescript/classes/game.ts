import Board from "./Board.js";
import MakeMove from "./MakeMove.js";
import Player from "./Player.js";
import prompt from "../helpers/prompt.js";

export default class Game {
  board: Board;
  makeMove: MakeMove;
  playerX!: Player;
  playerO!: Player;

  constructor() {
    while (true) {
      this.createPlayers(); // Create players (human/computer)
      this.board = new Board(); // Initialize a new board
      this.makeMove = new MakeMove(this.board); // Initialize MakeMove with the new board

      this.startGameLoop(); // Start the game loop
      this.whoHasWonOnGameOver(); // Check who won and display the result

      console.log('');
      let playAgain = prompt('Do you want to play again? (yes/no)? ');
      if (playAgain.toLowerCase() !== 'yes') {
        break; // End the loop if the user doesn't want to play again
      }
    }
  }

  createPlayers() {
    console.clear();
    console.log('Connect Four!\n');
    this.playerX = new Player(prompt('Player X\'s name (enter "computer" for AI): '), 'X');
    this.playerO = new Player(prompt('Player O\'s name (enter "computer" for AI): '), 'O');
  }

  // The new method for handling computer moves
  makeComputerMove(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let validMove = false;

      // Loop until the computer makes a valid move
      while (!validMove) {
        let randomColumn = Math.floor(Math.random() * this.board.columns); // Pick a random column
        validMove = this.makeMove.makeMove(this.makeMove.currentPlayerToken, randomColumn); // Attempt move
      }

      resolve(); // Resolve the promise once a move is made
    }, 1000); // Delay for 1000ms (1 second)
  });
}

  async startGameLoop() {
  while (!this.makeMove.gameOver) { // Loop until game is over
    console.clear();
    this.board.displayBoard(); // Show current board state

    let currentPlayer = this.makeMove.currentPlayerToken === 'X'
      ? this.playerX
      : this.playerO;

    if (currentPlayer.name === 'computer') {
      // If it's the computer's turn
      console.log(`Computer (${currentPlayer.token}) is making a move...`);
      await this.makeComputerMove(); // Wait for the computer move to complete
    } else {
      // Human player's turn
      let move = prompt(`Your move ${currentPlayer.token} (${currentPlayer.name}) - enter column (1-${this.board.columns}): `);
      let column = +move.trim() - 1;
      let moveSuccess = this.makeMove.makeMove(currentPlayer.token, column);

      if (!moveSuccess) {
        console.log('Invalid move, please try again.');
      }
    }
  }
}
  whoHasWonOnGameOver() {
    console.clear();
    this.board.displayBoard(); // Display the final board

    if (this.makeMove.winner) {
      let winningPlayer = this.makeMove.winner === 'X' ? this.playerX : this.playerO;
      console.log(`Woohoo! ${winningPlayer.token}: ${winningPlayer.name}, you won!`);
    } else if (this.makeMove.isADraw) {
      console.log('It\'s a tie!');
    }
  }
}