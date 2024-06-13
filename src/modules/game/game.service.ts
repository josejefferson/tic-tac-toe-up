import { Injectable } from '@nestjs/common'
import { Socket } from 'socket.io'
import { Room } from './room.entity'
import { Player } from './player.entity'

@Injectable()
export class GameService {
  rooms: Room[] = []

  /** Creates a room with the players in the queue */
  createRoom() {
    const room = new Room(false)
    this.setRemoveRoomTimer(room)
    this.rooms.push(room)
    return room
  }

  /** Sets a timer to remove a room after 5 minutes */
  setRemoveRoomTimer(room: Room) {
    clearTimeout(room.deleteTimer)
    room.deleteTimer = setTimeout(() => {
      this.removeRoom(room)
    }, /*5 * 60 */ 10000)
  }

  /** Deletes a room */
  removeRoom(room: Room) {
    this.rooms = this.rooms.filter((r) => r.id !== room.id)
  }

  /** Returns the room with the given ID */
  getRoom(roomID: string) {
    const room = this.rooms.find((room) => room.id === roomID)
    if (!room) {
      throw new Error('Room not found')
    }
    return room
  }

  /** Joins a player in a room */
  join(socket: Socket, roomID: string) {
    const room = this.getRoom(roomID)
    const player = new Player(socket)
    room.joinPlayer(player)
    void socket.join(room.id)
    socket.emit('started', { player: { symbol: player.symbol }, game: room.game })
  }

  /** Leaves the room */
  leave(socket: Socket, roomID: string) {
    const room = this.getRoom(roomID)
    const player = room.removePlayer(socket.id)
    void player?.socket.leave(room.id)
    if (!room.players.length) {
      this.setRemoveRoomTimer(room)
    }
  }
}
