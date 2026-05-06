import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { EmailDto } from 'src/email/dto/email.dto';
import { EmailService } from 'src/email/email.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
     private readonly emailService: EmailService) {}

  @Post('register')
  register(@Body() registerData: registerDto) {
    return this.authService.register(registerData);
  }
  
  @Post('verify-otp')
  verifyOtp(@Body() emailDto: EmailDto) {
    return this.emailService.verifyOtp(emailDto.email, emailDto.otp);
  } 
  @Post('resend-otp')
  resendOtp(@Body('email') email: string) {
    return this.emailService.sendOtpEmail(email);
  }

  @Post('login')
  login(@Body() loginData: loginDto) {
    return this.authService.login(loginData);
  }
}