import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import env from './@shared/env-shared/env';
import { LogService } from './@shared/log-shared/log.service';
import { ApiController } from './api/api.controller';
import { IndexController } from './index/index.controller';
import { ApiService } from './api/api.service';
import { EventService } from './event/event.service';
import { SessionService } from './session/session.service';
import { Session } from './session/session.entity';
import { Event } from './event/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session, Event]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      synchronize: true,
      entities: env.dist ? [__dirname + '/**/**.entity.js'] : [__dirname + '/**/**.entity{.ts,.js}'],
      host: env.config.PG_HOST,
      port: env.config.PG_PORT,
      username: env.config.PG_USERNAME,
      password: env.config.PG_PASSWORD,
      database: env.config.PG_DATABASE,
    }),
  ],
  controllers: [
  ApiController,
  IndexController],
  providers: [
    {provide: LogService, useValue: new LogService('arena')},
    ApiService,
    EventService,
    SessionService,
  ],
})
export class AppModule {}
