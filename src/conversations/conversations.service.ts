import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Conversation, ConversationDocument } from './Schema/conversation.Schema';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<ConversationDocument>,
  ) {}


  async createOrGetPrivateConversation(
    user1Id: string,
    user2Id: string,
  ) {
    const user1 = new Types.ObjectId(user1Id);
    const user2 = new Types.ObjectId(user2Id);

    let conversation = await this.conversationModel.findOne({
      type: 'private',
      participants: { $all: [user1, user2], $size: 2 },
    });

    if (!conversation) {
      conversation = await this.conversationModel.create({
        participants: [user1, user2],
        type: 'private',
        lastActivity: new Date(),
      });
    }

    return conversation;
  }

 
  async createGroupConversation(
    creatorId: string,
    participantIds: string[],
    name: string,
  ) {
    if (participantIds.length < 2) {
      throw new BadRequestException('Group must have at least 3 members');
    }

    const participants = [
      new Types.ObjectId(creatorId),
      ...participantIds.map((id) => new Types.ObjectId(id)),
    ];

    const conversation = await this.conversationModel.create({
      participants,
      type: 'group',
      name,
      lastActivity: new Date(),
    });

    return conversation;
  }

  
  async getUserConversations(userId: string) {
    return this.conversationModel
      .find({
        participants: new Types.ObjectId(userId),
      })
      .populate('participants', 'username email')
      .populate('lastMessage')
      .sort({ lastActivity: -1 });
  }


  async getConversationById(conversationId: string) {
    return this.conversationModel
      .findById(conversationId)
      .populate('participants', 'username email')
      .populate('lastMessage');
  }


  async updateActivity(conversationId: string) {
    return this.conversationModel.findByIdAndUpdate(conversationId, {
      lastActivity: new Date(),
    });
  }


  async addParticipant(conversationId: string, userId: string) {
    return this.conversationModel.findByIdAndUpdate(
      conversationId,
      {
        $addToSet: {
          participants: new Types.ObjectId(userId),
        },
      },
      { new: true },
    );
  }
}