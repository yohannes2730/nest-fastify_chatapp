import { Injectable } from '@nestjs/common';
import{registerDto} from './dto/register.dto'
import { InjectModel } from '@nestjs/mongoose';
import{Auths} from './Schema/auth.schema'
import { Model } from 'mongoose';
import{EmailService} from 'src/email/email.service'
@Injectable()

export class AuthService {
  constructor(
  @InjectModel(Auths.name) private readonly userModel :Model<Auths>,
  private readonly emailService :EmailService,

){}

async register(registerData :registerDto){  
const{ Username,email,password}= registerData;

}
}