import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDcument = Users & Document;

@Schema()
export class Users {
  @Prop({ required: true, unique: true, trim: true })
  Username: String;
  @Prop({ required: true, unique: true, trim: true })
  email: String;
  @Prop({ required: true, trim: true ,select :false})
  password: String;
}
export const userSchema = SchemaFactory.createForClass(Users)