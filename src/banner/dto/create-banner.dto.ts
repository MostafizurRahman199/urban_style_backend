import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateBannerDto {
  @ApiProperty({ example: 'Summer Sale', description: 'Banner title', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Up to 50% off!', description: 'Banner description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: true, description: 'Is the banner active?', required: false })
  @Transform(({ value }) => value === 'true' || value === true || value === undefined)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: 0, description: 'Sort order', required: false })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @IsOptional()
  sortOrder?: number;
}
