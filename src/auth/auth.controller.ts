import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerData: registerDto) {
    return this.authService.register(registerData);
  }

  @Post('login')
  login(@Body() loginData: loginDto) {
    return this.authService.login(loginData);
  }
}