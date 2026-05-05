import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Users {
  @Prop({ required: true, unique: true, trim: true })
  Username: string;
  @Prop({ required: true, unique: true, trim: true })
  email: string;
  @Prop({ required: true, trim: true ,select :false})
  password: string;
  @Prop({ default: false }) 
  isVerified: boolean;
}
export const userSchema = SchemaFactory.createForClass(Users)