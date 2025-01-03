import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board, Shape } from 'schema';
import { User } from 'src/types';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private readonly boardModel: Model<Board>,
  ) { }

  async createBoard(user: User): Promise<Board> {
    try {
      const board = await this.boardModel.create({
        ownerId: user.id,
        users: {
          userId: user.id,
          userName: user.name,
          role: 'ADMIN',
        },
      });
      return board;
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'something went wrong',
        error,
      });
    }
  }

  async saveBoard(boardId: string, shapes: Shape[]): Promise<Board> {
    try {
      const currentBoard = await this.boardModel.findOne({ boardId });
      const currentVersion = currentBoard.shapes;
      const versions = [...currentBoard.versions];

      if (versions.length > 5) {
        currentBoard.versions.shift();
      }

      currentBoard.versions.push({ shapes: [...currentVersion] });
      currentBoard.shapes = [...shapes];
      currentBoard.save();

      return currentBoard;
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'something went wrong',
        error,
      });
    }
  }

  async undoChanges(boardId: string, shapes: Shape[]) {
    try {
      const board = await this.boardModel.findOne({ boardId })
      const recent = board.versions[-1]
      board.versions[-1].shapes = [...shapes]
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'something went wrong',
        error,
      });
    }
  }

  async redoChanges(boardId: string) { }
}
