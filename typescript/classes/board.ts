export default class Board {
  board: string[][];
  rows: number;
  columns: number;

  constructor(rows: number = 6, columns: number = 7) {
    this.rows = rows;
    this.columns = columns;

    // Initialize the board with empty strings
    this.board = [...new Array(this.rows)].map(() => [...new Array(this.columns)].map(() => ''));
  }

  // Method to display the board in the terminal
  displayBoard() {
    const line = '\n' + '-'.repeat(this.columns * 2 + 1) + '\n';
    console.log(
      line +
      this.board
        .map(row => row.map(column => `|${column || ' '}`).join('') + '|')
        .join(line) +
      line
    );
  }
}

