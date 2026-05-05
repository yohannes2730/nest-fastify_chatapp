import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomInt } from 'node:crypto';
import { Users } from 'src/users/Schema/user.schema';
import { EmailOtp } from './Schema/email.schema';
@Injectable()
export class EmailService {

    constructor(
        @InjectModel(Users.name) private readonly userModel: Model<Users>,
        @InjectModel(EmailOtp.name) private readonly emailModel: Model<EmailOtp>
    ) 
    {}
         private  generateOtp(): string {
        return randomInt(100000, 999999).toString();
    }
  

}