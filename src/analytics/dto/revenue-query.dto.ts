import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum RevenueRange {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

export class RevenueQueryDto {
  @ApiProperty({ enum: RevenueRange, default: RevenueRange.DAY, required: false })
  @IsEnum(RevenueRange)
  @IsOptional()
  range?: RevenueRange = RevenueRange.DAY;
}
