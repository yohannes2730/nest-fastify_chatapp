
import { IsString ,IsEmail} from "class-validator";

export class EmailDto{
    @IsEmail()
    email: string;
    @IsString()
    otp: string;
}