import { randomRoomID } from '../../utils/helpers'
import { Game } from './game.entity'
import { Player } from './player.entity'

export class Room {
  id: string
  players: Player[] = []
  game: Game
  deleteTimer?: NodeJS.Timeout

  static MAX_PLAYERS = 2

  constructor(public isQuick: boolean) {
    this.id = randomRoomID()
    this.game = new Game()
  }

  getAvailableSymbol() {
    const availableSymbols = Game.SYMBOLS.filter((symbol) => !this.players.some((p) => p.symbol === symbol))
    return availableSymbols[0]
  }

  joinPlayer(player: Player) {
    if (this.getPlayer(player.id)) {
      throw new Error('Player already in room')
    }
    if (this.players.length >= Room.MAX_PLAYERS) {
      throw new Error('Room is full')
    }
    player.symbol = this.getAvailableSymbol()
    this.players.push(player)
    this.stopDeleteTimer()
  }

  removePlayer(playerID: Player['id']) {
    const player = this.getPlayer(playerID)
    this.players = this.players.filter((p) => p !== player)
    return player
  }

  getPlayer(playerID: Player['id']) {
    return this.players.find((p) => p.id === playerID)
  }

  stopDeleteTimer() {
    clearTimeout(this.deleteTimer)
  }
}
