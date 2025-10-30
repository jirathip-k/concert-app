import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserSeederService } from '@/user/user-seeder.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private userSeederService: UserSeederService) {}

  async onModuleInit() {
    await this.userSeederService.createAdminUser();
    await this.userSeederService.createDummyUser();
  }
}
