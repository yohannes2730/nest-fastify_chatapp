import{IsString,IsEmail,Matches,MinLength}from 'class-validator'

export class registerDto{ 
    @IsString()
    @Matches(/^[a-zA-Z0-9_.]{3,20}$/, { message: 'Invalid username format' })
    username: string;
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Password must contain uppercase,lowercase,digits ,special characters and <=8' })
    password: string;
  }