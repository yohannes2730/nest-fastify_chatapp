import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConversationsModule } from './conversations/conversations.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { EmailModule } from './email/email.module';
import { UsersModule } from './users/users.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // ENV CONFIG
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // DATABASE
    MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const uri = configService.get<string>('DATABASE_URL');

    if (!uri) {
      throw new Error('DATABASE_URL is not defined in .env');
    }

    return { uri };
  },
}),

    // MODULES
    UsersModule,
    EmailModule,
    ConversationsModule,
    ChatModule,
    MessageModule,
  ],

  controllers: [AppController],
})
export class AppModule {}