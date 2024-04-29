import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogsService, ErrorFilter } from '@thefirstspine/logs-nest';

async function bootstrap() {
  // Load dotenv config
  require('dotenv').config();

  // Start app
  const app = await NestFactory.create(AppModule.register());
  app.enableCors();
  app.useGlobalFilters(new ErrorFilter(new LogsService()));
  await app.listen(process.env.PORT);
}
bootstrap();
