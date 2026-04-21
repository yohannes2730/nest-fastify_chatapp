import { BadRequestException, Injectable } from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auths } from './Schema/auth.schema';
import { Model } from 'mongoose';
import { EmailService } from 'src/email/email.service';
import { loginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auths.name) private readonly userModel: Model<Auths>,
    private readonly emailService: EmailService,
  ) {}
  async register(registerData: registerDto) {
    const { Username, email, password } = registerData;
    const normalizedemail = email.trim().toLowerCase();
    const userExist = await this.userModel.findOne({
      email: normalizedemail && Username,
    });
    if (userExist) throw new BadRequestException('User already exist');
    const newUsers = new this.userModel({
      Username,
      email: normalizedemail,
      password,
      isVerified: false,
    });
    await newUsers.save();
    return { message: 'user register successfully' };
  }
  async login(loginData: loginDto) {
    const { email, password } = loginData;
    const normalizedemail = email.trim().toLowerCase();
    const users = await this.userModel
      .findOne({ email: normalizedemail })
      .select('+password');

    if (!users || !password)
      throw new BadRequestException('invalid email or password');

    if (!users.isVerified)
      throw new BadRequestException('please verified your email first');
    await users.save();
    return { message: 'user login successfully' };
  }
  
}
