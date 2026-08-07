import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class UpdateDeliveryChargeDto {
  @ApiProperty({ example: 60, description: 'Delivery charge amount' })
  @IsNumber()
  @Min(0)
  deliveryCharge: number;
}
