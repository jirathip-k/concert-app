import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concert } from './concert.entity';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private concertRepo: Repository<Concert>,
  ) {}

  findAll() {
    return this.concertRepo.find({ relations: ['reservations'] });
  }

  create(data: Partial<Concert>) {
    const concert = this.concertRepo.create(data);
    return this.concertRepo.save(concert);
  }

  async delete(id: number) {
    return this.concertRepo.delete(id);
  }
}
