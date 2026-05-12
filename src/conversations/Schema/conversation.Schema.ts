import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema({ timestamps: true })
export class Conversation {
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Users' }],
    required: true,
  })
  participants: Types.ObjectId[];

  @Prop({
    type: String,
    enum: ['private', 'group'],
    default: 'private',
  })
  type: 'private' | 'group';

  @Prop({ default: null })
  name?: string;

  @Prop({ default: null })
  avatar?: string;
  @Prop({
    type: Types.ObjectId,
    ref: 'Message',
    default: null,
  })
  lastMessage?: Types.ObjectId;

  @Prop({ default: Date.now })
  lastActivity?: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);

ConversationSchema.index({ participants: 1 });
ConversationSchema.index({ lastActivity: -1 });
