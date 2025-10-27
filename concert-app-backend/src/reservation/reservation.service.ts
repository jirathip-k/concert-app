import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { Concert } from 'src/concert/concert.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private resRepo: Repository<Reservation>,
    @InjectRepository(Concert)
    private concertRepo: Repository<Concert>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async reserve(userId: number, concertId: number) {
    const concert = await this.concertRepo.findOne({
      where: { id: concertId },
      relations: ['reservations'],
    });

    if (!concert) throw new BadRequestException('Concert not found');
    if (concert.reservations.length >= concert.totalSeats)
      throw new BadRequestException('No seats available');

    const existing = await this.resRepo.findOne({
      where: { user: { id: userId }, concert: { id: concertId } },
    });
    if (existing)
      throw new BadRequestException('You already reserved this concert');

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException('User not found');
    const reservation = this.resRepo.create({ user, concert });
    return this.resRepo.save(reservation);
  }

  async cancel(userId: number, concertId: number) {
    const reservation = await this.resRepo.findOne({
      where: { user: { id: userId }, concert: { id: concertId } },
    });
    if (!reservation) throw new BadRequestException('No reservation found');
    return this.resRepo.remove(reservation);
  }

  findUserHistory(userId: number) {
    return this.resRepo.find({
      where: { user: { id: userId } },
      relations: ['concert'],
    });
  }

  findAllHistory() {
    return this.resRepo.find({ relations: ['user', 'concert'] });
  }
}
