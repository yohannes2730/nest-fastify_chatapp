import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './Schema/user.schema';
import { UpdateUserDto } from './dto/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getMe(userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // Update current user profile
  async updateMe(userId: string, data: UpdateUserDto) {
  return this.userModel.findByIdAndUpdate(
    userId,
    {
      $set: {
        ...(data.username && { username: data.username }),
      },
    },
    { new: true },
  );
}

  // Optional: soft delete (recommended instead of hard delete)
  async deleteMe(userId: string) {
    return this.userModel.findByIdAndDelete(userId);
  }
}