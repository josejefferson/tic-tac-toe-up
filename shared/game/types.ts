export type GameSymbol = 'X' | 'O'

export interface Cell {
  symbol: GameSymbol | null
  order: number
}
