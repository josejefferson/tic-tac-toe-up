import { Controller, Get, Param, Post } from '@nestjs/common'
import { GameService } from './game.service'

@Controller('rooms')
export class GameController {
  constructor(public service: GameService) {}

  @Post('/create')
  create() {
    const room = this.service.createRoom()
    return { id: room.id }
  }

  @Get('/query/:id')
  query(@Param('id') id: string) {
    this.service.getRoom(id)
  }
}
