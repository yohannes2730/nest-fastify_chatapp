import{IsString, IsEmail, MinLength ,Matches} from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string; 
  @IsEmail()
  email: string;
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  })
  @MinLength(8)
  password: string;
}