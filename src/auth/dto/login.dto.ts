import { IsEmail, IsString,Matches,MinLength } from "class-validator";

export class loginDto{
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Password must contain uppercase,lowercase,digits ,special characters and <=8' })
    password: string;
}