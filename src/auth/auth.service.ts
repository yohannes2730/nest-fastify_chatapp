import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { Users } from 'src/users/Schema/user.schema';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
    private readonly emailService: EmailService,
  ) {} 

   async register(registerData: registerDto) {
  const { Username, email, password } = registerData;

  if (!Username || !email || !password ) {
    throw new BadRequestException('Missing required fields');
  }

  const normalizedEmail = email.trim().toLowerCase();

  const userExist = await this.userModel.findOne({ email: normalizedEmail });
  if (userExist) throw new BadRequestException('Email already exists');

  const usernameExist = await this.userModel.findOne({ Username });
  if (usernameExist)
    throw new BadRequestException('Username already exists');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new this.userModel({
    username: Username,
    email: normalizedEmail,
    password: hashedPassword,
    isVerified: false,
  });

  await newUser.save();

  await this.emailService.sendOtpEmail(normalizedEmail);

  return { message: 'Registration successful. OTP sent to email.' };
}

  async login(loginData: loginDto) {
    const { email, password } = loginData;

    const normalizedEmail = email.trim().toLowerCase();

    const user = await this.userModel
      .findOne({ email: normalizedEmail })
      .select('+password');

    if (!user || !user.password) {
  throw new BadRequestException('Invalid email or password');
}

const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    if (!user.isVerified) {
      throw new BadRequestException('Please verify your email first');
    }

    return {
      message: 'Login successful',
      userId: user._id,
    };
  }
}