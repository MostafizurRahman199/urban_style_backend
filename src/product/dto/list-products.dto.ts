import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class ListProductsDto {
  @ApiProperty({ description: 'Filter by category ID', required: false })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ description: 'Filter by active status', required: false })
  @Transform(({ value }) => (value !== undefined && value !== null && value !== '' ? value === 'true' || value === true : undefined))
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ description: 'Filter by popular products flag', required: false })
  @Transform(({ value }) => (value !== undefined && value !== null && value !== '' ? value === 'true' || value === true : undefined))
  @IsBoolean()
  @IsOptional()
  isPopular?: boolean;

  @ApiProperty({ description: 'Search term for product name or description', required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ description: 'Filter by minimum price', required: false })
  @Transform(({ value }) => (value !== undefined && value !== null && value !== '' ? parseFloat(value) : undefined))
  @IsNumber()
  @Min(0)
  @IsOptional()
  minPrice?: number;

  @ApiProperty({ description: 'Filter by maximum price', required: false })
  @Transform(({ value }) => (value !== undefined && value !== null && value !== '' ? parseFloat(value) : undefined))
  @IsNumber()
  @Min(0)
  @IsOptional()
  maxPrice?: number;

  @ApiProperty({ description: 'Page number (default: 1)', required: false, default: 1 })
  @Transform(({ value }) => (value !== undefined && value !== null && value !== '' ? parseInt(value, 10) : 1))
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({ description: 'Items per page (default: 10)', required: false, default: 10 })
  @Transform(({ value }) => (value !== undefined && value !== null && value !== '' ? parseInt(value, 10) : 10))
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 10;
}
