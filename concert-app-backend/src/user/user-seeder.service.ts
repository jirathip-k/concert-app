import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/user/user.entity';
import { Role } from '@/common/roles.enum';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createAdminUser() {
    // Check if admin user already exists
    const existingAdmin = await this.userRepo.findOne({
      where: { role: Role.ADMIN },
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // If no admin user, create a new one
    const password = 'admin';
    const adminUser = this.userRepo.create({
      id: 9999,
      username: 'admin',
      password: password,
      role: Role.ADMIN,
    });

    await this.userRepo.save(adminUser);
    console.log('Admin user created successfully');
  }
  async createDummyUser() {
    const existingUser = await this.userRepo.findOne({
      where: { id: 10000 },
    });

    if (existingUser) {
      console.log('user with ID 10000 already exists');
      return;
    }
    const password = '123';
    const dummyUser = this.userRepo.create({
      id: 10000,
      username: 'abc',
      password: password,
      role: Role.USER,
    });

    await this.userRepo.save(dummyUser);
    console.log('Dummy user created successfully');
  }
}
