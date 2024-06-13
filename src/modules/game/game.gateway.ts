import { UseFilters } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { GameExceptionsFilter } from './game.exception'
import { GameService } from './game.service'

@WebSocketGateway()
@UseFilters(new GameExceptionsFilter())
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() io: Server

  constructor(public service: GameService) {}

  handleConnection(socket: Socket) {
    this.service.join(socket)
  }

  handleDisconnect(socket: Socket) {
    this.service.leave(socket)
  }

  getMyRoom(socket: Socket) {
    const room = this.service.getCurrentRoom(socket.id)
    if (!room) {
      throw new Error('Forbidden action; you are not in a room')
    }
    const player = room.players.find((player) => player.id === socket.id)!
    return { room, player }
  }

  @SubscribeMessage('join')
  join(@ConnectedSocket() socket: Socket) {
    this.service.join(socket)
  }

  @SubscribeMessage('place')
  handleEvent(@MessageBody() position: number, @ConnectedSocket() socket: Socket) {
    const { room, player } = this.getMyRoom(socket)
    if (room.game.turn !== player.symbol) {
      throw new Error('Not your turn')
    }

    room.game.place(position)
    socket.to(room.id.toString()).emit('place', position)
  }

  @SubscribeMessage('restart')
  handleRestart(@ConnectedSocket() socket: Socket) {
    const { room } = this.getMyRoom(socket)
    room.game.restart()
    this.io.in(room.id.toString()).emit('gameInit', room.game)
  }

  @SubscribeMessage('sync')
  handleSync(@ConnectedSocket() socket: Socket) {
    const { room, player } = this.getMyRoom(socket)
    player.socket.emit('started', { player: { symbol: player.symbol }, game: room.game })
  }
}
