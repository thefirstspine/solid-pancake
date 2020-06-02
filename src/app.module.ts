import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogService } from './@shared/log-shared/log.service';
import { ApiController } from './api/api.controller';
import { IndexController } from './index/index.controller';
import { ApiService } from './api/api.service';
import { EventService } from './event/event.service';
import { SessionService } from './session/session.service';
import { Session } from './session/session.entity';
import { Event } from './event/event.entity';
import { SirupController } from './sirup/sirup.controller';

@Module({})
export class AppModule {

  public static register(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypeOrmModule.forFeature([Session, Event]),
        TypeOrmModule.forRoot({
          type: 'postgres',
          synchronize: true,
          entities: [__dirname + '/**/**.entity{.ts,.js}'],
          host: process.env.PG_HOST,
          port: parseInt(process.env.PG_PORT, 10),
          username: process.env.PG_USERNAME,
          password: process.env.PG_PASSWORD,
          database: process.env.PG_DATABASE,
        }),
      ],
      controllers: [
      ApiController,
      IndexController,
      SirupController],
      providers: [
        {provide: LogService, useValue: new LogService('solid-pancake')},
        ApiService,
        EventService,
        SessionService,
      ],
    };
  }

}
