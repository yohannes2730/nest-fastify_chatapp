import { Controller, Get, Patch, Delete, Req, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { auth } from 'src/auth/auth';
import { UpdateUserDto } from './dto/dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@Req() req) {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    return this.usersService.getMe(session.user.id);
  }

  @Patch('me')
  async updateMe(@Req() req, @Body() body: UpdateUserDto) {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    return this.usersService.updateMe(session.user.id, body);
  }

  @Delete('me')
  async deleteMe(@Req() req) {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    return this.usersService.deleteMe(session.user.id);
  }
}