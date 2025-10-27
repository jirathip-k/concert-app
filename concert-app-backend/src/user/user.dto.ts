import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { Role } from 'src/common/roles.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'Username of the new user' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsString()
  password: string;

  @ApiProperty({ enum: Role, example: Role.USER, required: false })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
