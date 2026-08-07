import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 'John Doe', description: 'Sender name' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Sender email (optional)', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '+8801712345678', description: 'Sender contact number' })
  @IsString()
  @IsNotEmpty()
  contactNumber: string;

  @ApiProperty({ example: 'I love your streetwear collection!', description: 'Message body' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  message: string;
}
