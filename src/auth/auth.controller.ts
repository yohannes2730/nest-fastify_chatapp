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

     // the registration form 
  @Post('register')
  register(@Body() registerData: registerDto) {
    return this.authService.register(registerData);
  }
  // this the email verification part 
  @Post('verify-otp')
  verifyOtp(@Body() emailDto: EmailDto) {
    return this.emailService.verifyOtp(emailDto.email, emailDto.otp);
  } 
  // this the resend part
  @Post('resend-otp')
  resendOtp(@Body('email') email: string) {
    return this.emailService.sendOtpEmail(email);
  }
// this is the login form pagne
  @Post('login')
  login(@Body() loginData: loginDto) {
    return this.authService.login(loginData);
  }
}