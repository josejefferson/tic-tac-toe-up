import { Injectable } from '@nestjs/common'
import { Socket } from 'socket.io'
import { Room } from './room.entity'
import { Player } from './player.entity'

@Injectable()
export class QuickGameService {
  waitingPlayers: Player[] = []
  rooms: Room[] = []

  /** Returns the room where the player is, or enters the waiting queue */
  join(socket: Socket) {
    const currentRoom = this.getCurrentRoom(socket.id)
    if (currentRoom) return currentRoom
    if (!this.waitingPlayers.some((player) => player.id === socket.id)) {
      this.waitingPlayers.push(new Player(socket))
    }
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
    const room = new Room(true)
    this.waitingPlayers.splice(0, 2).forEach(room.joinPlayer.bind(room))
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

  /** Leaves the room */
  leave(socket: Socket) {
    if (this.waitingPlayers.some((player) => player.id === socket.id)) {
      this.waitingPlayers = this.waitingPlayers.filter((player) => player.id !== socket.id)
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
      void player.socket.join(room.id)
      player.socket.emit('started', { player: { symbol: player.symbol }, game: room.game })
    }
  }

  /** Notifies that the room has been deleted */
  notifyRoomDeleted(room: Room) {
    for (const player of room.players) {
      void player.socket.leave(room.id)
      player.socket.emit('ended')
    }
  }
}
