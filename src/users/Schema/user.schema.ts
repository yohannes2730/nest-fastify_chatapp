import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Users {
  @Prop({ required: true, unique: true, trim: true })
  Username: String;
  @Prop({ required: true, unique: true, trim: true })
  email: String;
  @Prop({ required: true, trim: true ,select :false})
  password: String;
  @Prop({ default: false }) 
  isVerified: boolean;
}
export const userSchema = SchemaFactory.createForClass(Users)