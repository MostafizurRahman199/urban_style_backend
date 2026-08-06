import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsString, Min, IsOptional } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({ example: 'product-uuid-here', description: 'Product ID' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 2, description: 'Quantity to order' })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 'Blue', description: 'Selected color option', required: false })
  @IsString()
  @IsOptional()
  color?: string;
}
