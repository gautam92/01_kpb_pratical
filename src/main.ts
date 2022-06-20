import * as dotenv from 'dotenv';
dotenv.config();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './dispatchers/all-exceptions.filter';
import { swagger } from './swagger';
import { ValidationPipe } from './validations/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  const port = process.env.NODE_PORT || 3000;

  const logger = new Logger('bootstrap');

  app.use(compression());
  // app.enableCors();
  app.use(helmet());

  app.setGlobalPrefix('api');

  swagger(app);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  logger.log(`Application start on port ${port} ${process.env.NODE_ENV}`);
}

bootstrap();
