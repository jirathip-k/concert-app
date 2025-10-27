import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Concert } from 'src/concert/concert.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Concert, User])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
