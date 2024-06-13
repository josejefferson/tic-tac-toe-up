import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { staticConfig } from './config/static.config'
import { GameModule } from './modules/game/game.module'

@Module({
  imports: [ServeStaticModule.forRoot(staticConfig), GameModule]
})
export class AppModule {}
