import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BoardModule } from './board';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        return {
          uri: 'mongodb://127.0.0.1:27017/scribbly',
        };
      },
    }),
    BoardModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('board');
  }
}
