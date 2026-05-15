import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, trim: true })
  username: string;

  @Prop({ required: true, unique: true, trim: true })
  email: string;

  @Prop({ select: false })
  password?: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: 0 })
  loginAttempts: number;

  @Prop({ default: null })
  blockedUntil: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);