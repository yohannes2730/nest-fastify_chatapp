import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomInt } from 'node:crypto';
import { Users } from 'src/users/Schema/user.schema';
import { EmailOtp } from './Schema/email.schema';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
@Injectable()
export class EmailService {

    constructor(
     private readonly mailerService: MailerService,
        @InjectModel(Users.name) private readonly userModel: Model<Users>,
        @InjectModel(EmailOtp.name) private readonly emailModel: Model<EmailOtp>
    ) 
    {}
         private  generateOtp(): string {
        return randomInt(100000, 999999).toString();
    }

   
  async sendOtpEmail(email: string): Promise<{ message: string }> {
    if(!email){
        throw new Error('Email is required');
    }
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const otp = this.generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000);

    await this.emailModel.create({ email, otp: otpHash, verified: false, expiresAt });

   await this.mailerService.sendMail({
      to: email,
      from: `"joye love" <${process.env.MAIL_USER}>`,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 3 minutes.`,
      html: `<p>Your OTP code is <b>${otp}</b>. It will expire in 3 minutes.</p>`,
    });

    return { message: 'OTP sent to your email' };
  }
  
   async verifyOtp(email: string, otp: string) {
    if(!email || !otp){
        throw new Error('Email and OTP are required');
    } 
    const record = await this.emailModel.findOne({ email, otp });
    if (!record) {
      throw new Error('OTP not found');
    }
   
    if (record.expiresAt < new Date()) throw new BadRequestException('OTP expired');

    const isValid = await bcrypt.compare(otp, record.otp);
    if (!isValid) throw new BadRequestException('Invalid OTP');

    record.verified = true;
    await record.save();

    await this.userModel.updateOne({ email }, { $set: { isVerified: true } });
    return { message: 'Email verified successfully' };
  }
  

}