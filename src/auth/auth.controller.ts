import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { EmailDto } from 'src/email/dto/email.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly emailService: EmailService,
  ) {}

  @Post('verify-otp')
  verifyOtp(@Body() emailDto: EmailDto) {
    return this.emailService.verifyOtp(
      emailDto.email,
      emailDto.otp,
    );
  }

  @Post('resend-otp')
  resendOtp(@Body('email') email: string) {
    return this.emailService.sendOtp(email);
  }
}