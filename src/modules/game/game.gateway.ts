import { UseFilters } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { GameExceptionsFilter } from './game.exception'
import { GameService } from './game.service'

@WebSocketGateway({ namespace: '/room' })
@UseFilters(new GameExceptionsFilter())
export class GameGateway implements OnGatewayInit, OnGatewayDisconnect {
  @WebSocketServer() io: Server

  constructor(public service: GameService) {}

  afterInit(server: Server) {
    server.use((socket, next) => {
      try {
        const id = this.getRoomID(socket)
        this.service.join(socket, id)
        next()
      } catch (err) {
        next(err)
      }
    })
  }

  handleDisconnect(socket: Socket) {
    const id = this.getRoomID(socket)
    this.service.leave(socket, id)
  }

  getRoomID(socket: Socket) {
    const id = socket.handshake.query.id
    if (typeof id !== 'string') {
      throw new Error('Invalid room ID')
    }
    return id
  }

  getMyRoom(socket: Socket) {
    const id = this.getRoomID(socket)
    const room = this.service.getRoom(id)
    const player = room.getPlayer(socket.id)
    if (!player) {
      throw new Error('Forbidden action; you are not in this room')
    }
    return { room, player }
  }

  @SubscribeMessage('place')
  handleEvent(@MessageBody() position: number, @ConnectedSocket() socket: Socket) {
    const { room, player } = this.getMyRoom(socket)
    if (room.game.turn !== player.symbol) {
      throw new Error('Not your turn')
    }

    room.game.place(position)
    socket.to(room.id).emit('place', position)
  }

  @SubscribeMessage('restart')
  handleRestart(@ConnectedSocket() socket: Socket) {
    const { room } = this.getMyRoom(socket)
    room.game.restart()
    this.io.in(room.id).emit('gameInit', room.game)
  }

  @SubscribeMessage('sync')
  handleSync(@ConnectedSocket() socket: Socket) {
    const { room, player } = this.getMyRoom(socket)
    player.socket.emit('started', { player: { symbol: player.symbol }, game: room.game })
  }
}
