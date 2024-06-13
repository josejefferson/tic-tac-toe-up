import { Cell, GameSymbol } from '../../shared/game/types'
import { Game } from '../utils/game'

export type SocketEventStarted = [
  {
    player: { symbol: GameSymbol }
    game: Game
  }
]

export type SocketEventPlace = [number, Cell]

export type SocketEventWon = [GameSymbol]

export type SocketEventGameInit = [Game]
