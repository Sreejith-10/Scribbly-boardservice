import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Shape, ShapeSchema } from './shape.schema';

export type BoardVersionDocument = HydratedDocument<BoardVersion>;

@Schema({ _id: false, timestamps: true })
export class BoardVersion {
  @Prop({ type: [ShapeSchema], default: [] })
  shapes: Shape[];
}

export const BoardVersionSchema = SchemaFactory.createForClass(BoardVersion);
