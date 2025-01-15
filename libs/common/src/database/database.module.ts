import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory(configService: ConfigService) {
        return {
          uri: configService.get('MONGO_URI'),
        };
      },
    }),
  ],
})
export class DatabaseModule {
  static forFeature(definitions: ModelDefinition[]) {
    return MongooseModule.forFeature(definitions);
  }
}
