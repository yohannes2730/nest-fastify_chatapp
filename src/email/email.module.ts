import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailOtp, EmailOtpSchema } from './Schema/email.schema';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,

    MongooseModule.forFeature([
      { name: EmailOtp.name, schema: EmailOtpSchema },
    ]),

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: Number(configService.get<number>('MAIL_PORT')),
          secure: false,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        },
      }),
    }),
  ],

  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}