import { Module } from '@nestjs/common'
import { GameController } from './game.controller'
import { GameGateway } from './game.gateway'
import { GameService } from './game.service'
import { QuickGameGateway } from './quick-game.gateway'
import { QuickGameService } from './quick-game.service'

@Module({
  providers: [GameGateway, QuickGameGateway, GameService, QuickGameService],
  controllers: [GameController]
})
export class GameModule {}
