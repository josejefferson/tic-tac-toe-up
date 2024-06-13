import { GameSymbol } from '../../../shared/game/types'
import { Socket } from 'socket.io'

export class Player {
  id: string

  constructor(
    public socket: Socket,
    public symbol: GameSymbol | null = null
  ) {
    this.id = socket.id
  }
}
