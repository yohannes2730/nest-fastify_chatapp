import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Req,
} from '@nestjs/common';

import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';


@Controller('conversations')

export class ConversationsController {
  constructor(
    private readonly conversationsService: ConversationsService,
  ) {}

  @Post()
  create(@Body() dto: CreateConversationDto, @Req() req) {
    const userId = req.user.id;

    return this.conversationsService.createOrGet(
      userId,
      dto.participantId,
    );
  }

  @Get()
  findMyConversations(@Req() req) {
    const userId = req.user.id;

    return this.conversationsService.findUserConversations(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;

    return this.conversationsService.findOneSecure(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateConversationDto,
    @Req() req,
  ) {
    const userId = req.user.id;

    return this.conversationsService.updateSecure(id, dto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;

    return this.conversationsService.removeSecure(id, userId);
  }
}