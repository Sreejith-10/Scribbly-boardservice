import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User, UserSchema } from './user.schema';
import { Shape, ShapeSchema } from './shape.schema';
import { BoardVersion, BoardVersionSchema } from './version.schema';

export type BoardDocument = HydratedDocument<Board>;

@Schema({ timestamps: true, collection: 'boards' })
export class Board {
  @Prop({
    type: Types.ObjectId,
    default: () => new Types.ObjectId(),
    required: true,
    unique: true,
  })
  boardId: Types.ObjectId;

  @Prop({ required: true })
  ownerId: string;

  @Prop({ type: [UserSchema] })
  users: User[];

  @Prop({ type: [ShapeSchema], default: [] })
  shapes: Shape[];

  @Prop({ type: [BoardVersionSchema], default: [] })
  versions: BoardVersion[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
