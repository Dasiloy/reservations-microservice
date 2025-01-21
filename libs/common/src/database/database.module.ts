import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
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
