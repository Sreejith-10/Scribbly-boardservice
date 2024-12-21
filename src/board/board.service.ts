import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board } from 'schema/board.schema';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private readonly boardModel: Model<Board>,
  ) {}

  async createBoard() {
    return '';
  }

  async saveBoard() {}

  async undoChanges() {}

  async redoChanges() {}

  async updateBoard() {
    return '';
  }
}
