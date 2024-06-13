import { atom } from 'jotai'
import { SocketEventStarted } from '../../types/socket'
import { Game } from '../../utils/game'

const defaultGame = new Game()
defaultGame.turn = 'O'

export const stateAtom = atom<SocketEventStarted[0]>({
  player: { symbol: 'X' },
  game: defaultGame
})
