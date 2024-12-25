import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShapeDocument = HydratedDocument<Shape>;

@Schema({ _id: false })
export class Shape {
  @Prop({ required: true })
  shapeId: string;

  @Prop({ required: true, enum: ['RECTANGLE', 'CIRCLE', 'ARROW', 'SCRIBBLE'] })
  type: string;

  @Prop({ required: true })
  x: number;

  @Prop({ required: true })
  y: number;

  @Prop()
  width?: number;

  @Prop()
  height?: number;

  @Prop()
  radius?: number;

  @Prop({ type: [Number] })
  points?: number[];

  @Prop({ default: '#ffffff0' })
  stroke?: string;

  @Prop()
  fill?: string;

  @Prop({ enum: ['butt', 'round', 'square'], default: 'round' })
  lineCap?: string;

  @Prop({ enum: ['butt', 'round', 'square'], default: 'round' })
  lineJoin?: string;
}

export const ShapeSchema = SchemaFactory.createForClass(Shape);
