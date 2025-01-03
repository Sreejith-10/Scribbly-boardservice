import { Controller, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CurrentUser } from 'src/decorators';
import { User } from 'src/types';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('/create')
  createBoard(@CurrentUser() user: User) {
    return this.boardService.createBoard(user);
  }
}
