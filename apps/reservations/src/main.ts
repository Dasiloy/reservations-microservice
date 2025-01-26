/* eslint-disable @typescript-eslint/no-require-imports */
import { Logger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ReservationsModule } from './reservations.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  const config = app.get(ConfigService);

  // connect to the auth microservice
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: config.get('TCP_PORT'),
    },
  });

  app.use(cookieParser());
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.startAllMicroservices();
  await app.listen(config.get('HTTP_PORT'));
}
bootstrap();
