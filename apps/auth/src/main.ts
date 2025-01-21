/* eslint-disable @typescript-eslint/no-require-imports */
import { Logger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
const cookieParser = require('cookie-parser');

async function bootstrap() {
  // create the http server
  const app = await NestFactory.create(AuthModule);

  // connect to the auth microservice
  app.connectMicroservice({
    transport: Transport.TCP,
  });

  app.use(cookieParser());
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const config = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(config.get('PORT'));
}
bootstrap();
