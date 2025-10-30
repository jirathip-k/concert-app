import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Concert } from './concert.entity';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private concertRepo: Repository<Concert>,
  ) {}

  findAll() {
    return this.concertRepo.find({
      where: { deletedAt: IsNull() },
      relations: ['reservations'],
    });
  }

  create(data: Partial<Concert>) {
    const concert = this.concertRepo.create(data);
    return this.concertRepo.save(concert);
  }

  async delete(id: number) {
    const concert = await this.concertRepo.findOne({ where: { id } });
    if (!concert) {
      throw new Error('Concert not found');
    }
    if (concert.deletedAt) {
      throw new BadRequestException('Concert has already been deleted');
    }

    // Set the deletedAt field to the current time
    concert.deletedAt = new Date();

    return this.concertRepo.save(concert);
  }
}
