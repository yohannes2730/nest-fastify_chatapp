import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConversationsModule } from './conversations/conversations.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { EmailModule } from './email/email.module';

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
        const uri = configService.get<string>('database.connectionString');

        if (!uri) {
          throw new Error('MongoDB connection string is not defined!');
        }

        return { uri };
      },
    }),

    // MODULES
    EmailModule,
    ConversationsModule,
    ChatModule,
    MessageModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}