import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Slim Fit Shirt', description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'A classic cotton shirt.', description: 'Product description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'https://youtube.com/watch?v=...', description: 'Youtube video URL', required: false })
  @IsString()
  @IsOptional()
  videoUrl?: string;

  @ApiProperty({ example: 49.99, description: 'Product price' })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 39.99, description: 'Discount price', required: false })
  @Transform(({ value }) => {
    if (value === null || value === 'null' || value === '' || value === undefined) return null;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? null : parsed;
  })
  @IsNumber()
  @IsOptional()
  discountPrice?: number | null;

  @ApiProperty({ example: 60.00, description: 'Delivery charge', required: false })
  @Transform(({ value }) => {
    if (value === null || value === 'null' || value === '' || value === undefined) return 0;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  deliveryCharge?: number;

  @ApiProperty({ example: 100, description: 'Stock quantity' })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({ example: ['Red', 'Blue'], description: 'Available colors', required: false })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value.split(',').map((c: string) => c.trim());
      }
    }
    return value;
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  colors?: string[];

  @ApiProperty({ example: ['S (28 inch)', 'M (30 inch)'], description: 'Available sizes', required: false })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value.split(',').map((s: string) => s.trim());
      }
    }
    return value;
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  sizes?: string[];

  @ApiProperty({ example: false, description: 'Is the product popular?', required: false })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  isPopular?: boolean;

  @ApiProperty({ example: true, description: 'Is the product active?', required: false })
  @Transform(({ value }) => value === 'true' || value === true || value === undefined)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: 'uuid-category-id', description: 'Category ID' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ example: ['Red', 'Blue'], description: 'Image colors mapped to uploaded images by index', required: false })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [value];
      }
    }
    return value;
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imageColors?: string[];
}
