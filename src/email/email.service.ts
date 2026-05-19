import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomInt } from 'node:crypto';
import { EmailOtp } from './Schema/email.schema';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectModel(EmailOtp.name)
    private readonly emailModel: Model<EmailOtp>,
  ) {}

  private generateOtp(): string {
    return randomInt(100000, 999999).toString();
  }

  async sendOtp(email: string) {
    if (!email) throw new BadRequestException('Email required');

    const otp = this.generateOtp();
    const hash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000);

    await this.emailModel.create({
      email,
      otp: hash,
      expiresAt,
      verified: false,
      resendCount: 0,
    });
    await this.mailerService.sendMail({
       to: email,
      from: `"joye love" <${process.env.MAIL_USER}>`,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
      html: `<p>Your OTP code is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
    });

    return { message: 'OTP sent' };
  }
// verfiy otp
  async verifyOtp(email: string, otp: string) {
    if (!email || !otp) {
      throw new BadRequestException('Email and OTP required');
    }

    const record = await this.emailModel
      .findOne({ email })
      .sort({ expiresAt: -1 });

    if (!record) throw new BadRequestException('OTP not found');

    if (record.expiresAt < new Date())
      throw new BadRequestException('OTP expired');

    const isValid = await bcrypt.compare(otp, record.otp);
    if (!isValid) throw new BadRequestException('Invalid OTP');

    record.verified = true;
    await record.save();

    return { message: 'Email verified successfully' };
  }
   // this resend otp with limit and coooldown of 60 seconds
  async resendOtp(email: string) {
    const normalizedEmail = email.trim().toLowerCase();

    const record = await this.emailModel
      .findOne({ email: normalizedEmail })
      .sort({ expiresAt: -1 });

    const now = new Date();

    if (record) {
      if (record.resendCount >= 3) {
        throw new BadRequestException('Resend limit reached');
      }
      if (
        record.lastResendAt &&
        now.getTime() - new Date(record.lastResendAt).getTime() < 60000
      ) {
        throw new BadRequestException('Wait 60 seconds');
      }

      record.resendCount += 1;
      record.lastResendAt = now;
      await record.save();
    }

    return this.sendOtp(normalizedEmail);
  }
}