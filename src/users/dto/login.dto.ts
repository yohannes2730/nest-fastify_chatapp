import { IsEmail,Matches,MinLength } from "class-validator";

export class LoginDto {
    @IsEmail()  
    email: string;
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      })
      @MinLength(8)
    password: string;
  }