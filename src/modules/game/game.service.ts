import { Injectable } from '@nestjs/common'
import { Game } from './game.entity'
import { GameSymbol } from '../../../shared/game/types'
import { Socket } from 'socket.io'

export interface Player {
  id: string
  socket: Socket
  symbol: GameSymbol
}

export interface Room {
  id: number
  players: Player[]
  game: Game
}

@Injectable()
export class GameService {
  static SYMBOLS = ['X', 'O'] as GameSymbol[]
  game = new Game()
  waitingPlayers: Socket[] = []
  rooms: Room[] = []

  /** Returns the room where the player is, or enters the waiting queue */
  join(socket: Socket) {
    const currentRoom = this.getCurrentRoom(socket.id)
    if (currentRoom) return currentRoom
    if (!this.waitingPlayers.includes(socket)) this.waitingPlayers.push(socket)
    return this.match()
  }

  /** Returns the room where the player is, or null */
  getCurrentRoom(sessionID: string) {
    return this.rooms.find((room) => room.players.some((player) => player.id === sessionID))
  }

  /** Creates a room if there are 2 players waiting */
  match() {
    if (this.waitingPlayers.length < 2) return null
    return this.createRoom()
  }

  /** Creates a room with the players in the queue */
  createRoom() {
    const id = Math.random()
    const players = this.waitingPlayers.splice(0, 2).map<Player>(this.createPlayer.bind(this))
    const game = new Game()
    const room = { id, players, game }
    this.rooms.push(room)
    this.notifyRoomCreated(room)
    this.match()
    return room
  }

  /** Deletes a room */
  removeRoom(room: Room) {
    this.rooms = this.rooms.filter((r) => r.id !== room.id)
    this.notifyRoomDeleted(room)
  }

  /** Creates a player */
  createPlayer(socket: Socket, index: number): Player {
    const id = socket.id
    const symbol = GameService.SYMBOLS[index]
    return { id, socket, symbol } as Player
  }

  /** Leaves the room */
  leave(socket: Socket) {
    if (this.waitingPlayers.includes(socket)) {
      this.waitingPlayers = this.waitingPlayers.filter((s) => s !== socket)
      return null
    }
    const currentRoom = this.getCurrentRoom(socket.id)
    if (!currentRoom) return null
    this.removeRoom(currentRoom)
    this.match()
  }

  /** Notifies that a new room has been created */
  notifyRoomCreated(room: Room) {
    for (const player of room.players) {
      void player.socket.join(room.id.toString())
      player.socket.emit('started', { player: { symbol: player.symbol }, game: room.game })
    }
  }

  /** Notifies that the room has been deleted */
  notifyRoomDeleted(room: Room) {
    for (const player of room.players) {
      void player.socket.leave(room.id.toString())
      player.socket.emit('ended')
    }
  }
}
