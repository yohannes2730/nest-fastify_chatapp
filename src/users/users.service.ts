import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './Schema/user.schema';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
    private readonly emailService: EmailService,
  ) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).select('+password');
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async updateUser(id: string, data: any) {
    return this.userModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}