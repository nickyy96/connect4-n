export class ConnectFourGame {
  public board: number[][];
  public currentPlayer: number;
  public numRows: number;
  public numCols: number;
  public numPlayers: number;
  public gameOver: boolean;
  public winner: number | null;

  constructor(
    numRows: number = 6,
    numCols: number = 7,
    numPlayers: number = 2
  ) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.numPlayers = numPlayers;
    this.board = [];
    for (let r = 0; r < this.numRows; r++) {
      this.board.push(new Array(this.numCols).fill(0));
    }

    this.currentPlayer = 1;
    this.gameOver = false;
    this.winner = null;
  }

  public makeMove(column: number): boolean {
    if (this.gameOver) {
      return false;
    }

    if (column < 0 || column >= this.numCols) {
      return false;
    }

    for (let r = 0; r < this.numRows; r++) {
      if (this.board[r][column] === 0) {
        this.board[r][column] = this.currentPlayer;

        // win check
        if (this.checkWin(r, column)) {
          this.gameOver = true;
          this.winner = this.currentPlayer;
        } else {
          // draw check
          if (this.isBoardFull()) {
            this.gameOver = true;
            this.winner = null;
          } else {
            this.switchPlayer();
          }
        }
        return true;
      }
    }
    return false;
  }

  private checkWin(row: number, col: number): boolean {
    const player = this.currentPlayer;
    const directions = [
      { dr: 0, dc: 1 },
      { dr: 1, dc: 0 },
      { dr: 1, dc: 1 },
      { dr: 1, dc: -1 },
    ];

    for (const dir of directions) {
      let count = 1;

      let r = row + dir.dr;
      let c = col + dir.dc;
      while (this.isValidCell(r, c) && this.board[r][c] === player) {
        count++;
        r += dir.dr;
        c += dir.dc;
      }

      r = row - dir.dr;
      c = col - dir.dc;
      while (this.isValidCell(r, c) && this.board[r][c] === player) {
        count++;
        r -= dir.dr;
        c -= dir.dc;
      }

      if (count >= 4) {
        return true;
      }
    }
    return false;
  }

  private isValidCell(row: number, col: number): boolean {
    return row >= 0 && row < this.numRows && col >= 0 && col < this.numCols;
  }

  private isBoardFull(): boolean {
    for (let c = 0; c < this.numCols; c++) {
      if (this.board[this.numRows - 1][c] === 0) {
        return false;
      }
    }
    return true;
  }

  private switchPlayer(): void {
    this.currentPlayer = (this.currentPlayer % this.numPlayers) + 1;
  }
}
