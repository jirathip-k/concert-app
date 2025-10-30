import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '@/reservation/reservation.entity';
import { ReservationService } from '@/reservation/reservation.service';
import { ReservationController } from '@/reservation/reservation.controller';
import { Concert } from '@/concert/concert.entity';
import { User } from '@/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Concert, User])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
