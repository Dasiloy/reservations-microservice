import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigService, ConfigModule as NestConfig } from '@nestjs/config';

@Module({
  imports: [
    NestConfig.forRoot({
      cache: true,
      expandVariables: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
