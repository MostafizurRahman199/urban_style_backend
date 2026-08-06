import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Men Fashion', description: 'Name of the category' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'men-fashion', description: 'Slug of the category (auto-generated if empty)', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(120)
  slug?: string;
}
