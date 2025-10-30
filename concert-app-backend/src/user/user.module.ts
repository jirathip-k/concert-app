import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/user.entity';
import { UserService } from '@/user/user.service';
import { UserSeederService } from '@/user/user-seeder.service';
import { UserController } from '@/user/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserSeederService],
  exports: [UserService, UserSeederService],
})
export class UserModule {}
