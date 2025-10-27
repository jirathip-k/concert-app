import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min } from 'class-validator';

export class CreateConcertDto {
  @ApiProperty({ example: 'Coldplay Live', description: 'Concert name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'World Tour 2025', description: 'Concert details' })
  @IsString()
  description: string;

  @ApiProperty({ example: 500, description: 'Total available seats' })
  @IsInt()
  @Min(1)
  totalSeats: number;
}
