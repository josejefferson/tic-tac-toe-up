import { Cell, GameSymbol } from './types'

export class Game {
  public board: Cell[] = []
  public order = 0
  public turn: GameSymbol = 'X'
  public winner: GameSymbol | null = null
  public winnerPattern: number[] = []

  static MAX_SYMBOLS = 6
  static SYMBOLS = ['X', 'O'] as GameSymbol[]

  constructor() {
    this.start()
  }

  private start() {
    this.board = []
    this.order = 0
    this.turn = Game.SYMBOLS[Math.floor(Math.random() * 2)]
    this.winner = null
    this.winnerPattern = []

    for (let i = 0; i < 9; i++) {
      this.board.push({ symbol: null, order: -1 })
    }
  }

  public restart() {
    if (!this.getWinner()) {
      throw new Error('Cannot start a new match; the current match is still ongoing')
    }
    this.start()
  }

  public place(position: number): Cell {
    if (!this.isValid(position)) {
      throw new Error('Cannot play here; this position is not allowed')
    }

    if (this.getWinner()) {
      throw new Error('Cannot make a move; the game has already ended. Please start a new game')
    }

    this.board[position].symbol = this.turn
    this.board[position].order = this.order
    this.order++
    this.turn = this.turn === 'X' ? 'O' : 'X'

    for (const cell of this.board) {
      if (cell.order < this.order - Game.MAX_SYMBOLS) {
        cell.symbol = null
        cell.order = -1
      }
    }

    this.getWinner()

    return this.board[position]
  }

  private isValid(position: number): boolean {
    if (typeof position !== 'number') return false
    if (!this.board[position]) return false
    if (this.board[position].symbol) return false
    return true
  }

  public getWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        this.board[a].symbol &&
        this.board[a].symbol === this.board[b].symbol &&
        this.board[a].symbol === this.board[c].symbol
      ) {
        this.winner = this.board[a].symbol
        this.winnerPattern = lines[i]
        return this.winner
      }
    }
    return null
  }

  public toString() {
    const rows = []
    for (let row = 0; row < 3; row++) {
      const rowStr = this.board
        .slice(row * 3, row * 3 + 3)
        .map((c) => c.symbol ?? ' ')
        .join('|')
      rows.push(rowStr)
    }
    return rows.join('\n-+-+-\n')
  }
}
