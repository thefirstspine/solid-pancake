import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorFilter } from './error.filter';
import { LogService } from './@shared/log-shared/log.service';

async function bootstrap() {
  // Load dotenv config
  require('dotenv').config();

  // Start app
  const app = await NestFactory.create(AppModule.register());
  app.enableCors();
  app.useGlobalFilters(new ErrorFilter(new LogService('solid-pancake')));
  await app.listen(process.env.PORT);
}
bootstrap();
