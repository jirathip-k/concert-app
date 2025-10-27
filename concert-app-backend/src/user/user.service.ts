import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async register(dto: CreateUserDto) {
    const existing = await this.userRepo.findOne({
      where: { username: dto.username },
    });
    if (existing) throw new BadRequestException('Username already exists');

    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  findById(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }
}
