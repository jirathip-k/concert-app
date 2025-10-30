import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation, ReservationAction } from './reservation.entity';
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

  async reserveOrCancel(data: {
    userId: number;
    concertId: number;
    action: ReservationAction;
  }) {
    const { userId, concertId, action } = data;
    const concert = await this.concertRepo.findOne({
      where: { id: concertId },
      relations: ['reservations'],
    });

    if (!concert) throw new BadRequestException('Concert not found');
    if (
      concert.reservations.length >= concert.totalSeats &&
      action === ReservationAction.RESERVED
    )
      throw new BadRequestException('No seats available');

    const existing = await this.resRepo.findOne({
      where: { user: { id: userId }, concert: { id: concertId } },
    });

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException('User not found');

    if (existing) {
      // If reservation exists and we're trying to cancel, set the action to CANCELED
      if (action === ReservationAction.CANCELED) {
        existing.action = ReservationAction.CANCELED;
        return this.resRepo.save(existing);
      } else {
        // If reservation exists and we're trying to reserve again, return an error
        throw new BadRequestException('You already reserved this concert');
      }
    } else {
      // If no reservation exists, create a new reservation with the requested action
      if (action === ReservationAction.RESERVED) {
        const reservation = this.resRepo.create({ user, concert, action });
        return this.resRepo.save(reservation);
      } else {
        throw new BadRequestException(
          'Cannot cancel a reservation that does not exist',
        );
      }
    }
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
