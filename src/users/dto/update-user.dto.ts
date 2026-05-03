import { IsOptional, IsString } from 'class-validator';

export class updateUserDto {
  @IsOptional()
  @IsString()
  Username?: string;

  @IsOptional()
  @IsString()
  email?: string;
}