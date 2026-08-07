import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCidDto {
  @ApiProperty({ example: 'CID-100293' })
  @IsString()
  @IsNotEmpty()
  cidNumber: string;
}
