import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Optional: Set a global prefix
  // app.setGlobalPrefix('api');
  
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
}

bootstrap();

export default server;
