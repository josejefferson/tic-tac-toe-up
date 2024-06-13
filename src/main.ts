import * as dotenv from 'dotenv'
dotenv.config()

import { ClassSerializerInterceptor } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { helmetConfig } from './config/helmet.config'
import { sessionConfig } from './config/session.config'
import { validationPipe } from './config/validation.config'
import { webMiddleware } from './config/web.config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(validationPipe)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  app.set('trust proxy', 1)
  app.use(helmet(helmetConfig))
  app.use(cookieParser())
  app.use(session(sessionConfig))
  app.use(await webMiddleware(app.getHttpServer()))

  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT || 3000)
}
void bootstrap()

process.on('uncaughtException', console.error)
