import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BoardDocument = HydratedDocument<Board>;

export class Board {
  @Prop({ required: true })
  boardId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: Date.now() })
  createAt: number;

  @Prop({ default: Date.now() })
  updatedAt: number;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
