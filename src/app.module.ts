import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { ConversationsModule } from './conversations/conversations.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';

import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('database.connectionString');

        if (!uri) {
          throw new Error('MongoDB connection string is not defined!');
        }

        return {
          uri,
        };
      },
    }),

    UsersModule,
    EmailModule,
    AuthModule,
    ConversationsModule,
    ChatModule,
    MessageModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
