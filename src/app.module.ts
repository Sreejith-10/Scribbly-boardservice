import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigService) => {
                return {
                    uri: configService.getOrThrow<string>('MONGO_URI'),
                };
            },
        }),
        BoardModule,
    ],
})
export class AppModule {}
