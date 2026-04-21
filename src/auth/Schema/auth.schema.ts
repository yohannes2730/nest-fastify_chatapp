import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDcument = Auths & Document;

@Schema()
export class Auths {
  @Prop({ required: true, unique: true, trim: true })
  Username: String;
  @Prop({ required: true, unique: true, trim: true })
  email: String;
  @Prop({ required: true, trim: true ,select :false})
  password: String;
  @Prop({default :false})
  isVerified : boolean
}
export const userSchema = SchemaFactory.createForClass(Auths)