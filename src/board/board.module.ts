import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from 'schema/board.schema';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
    ],
    controllers: [BoardController],
    providers: [BoardService],
})
export class BoardModule {}
