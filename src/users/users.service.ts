import { Injectable } from '@nestjs/common';
import { Users } from './Schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailService } from 'src/email/email.service';
import { registerDto } from './dto/register.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly userModel :Model<Users>,
    private readonly emailService :EmailService
  ){}
  async register(registerData :registerDto){
    const{Username,email,password}= registerData;
    const normalizedEmail = email.trim().toLoweCase()
  }
}
