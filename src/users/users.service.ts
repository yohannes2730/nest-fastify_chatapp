import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from './Schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { registerDto } from 'src/auth/dto/register.dto';
@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private userModel : Model<Users>,
    private emailService :EmailService){}

    async register(resterData :registerDto){
        const{email,Username,password} = resterData;
        const normalizeEmail = email.toLowerCase().trim();
        const hashPassword = await bcrypt.hash(password, 10);
      const userExist = await this.userModel.findOne({email :normalizeEmail});
      if(userExist){ throw new BadRequestException('Email already exists');}

}
}