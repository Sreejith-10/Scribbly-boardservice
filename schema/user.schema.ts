import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ _id: false })
export class User {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ enum: ['VIEWER', 'EDITOR', 'ADMIN'], default: 'ADMIN' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
