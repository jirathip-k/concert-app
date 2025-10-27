import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConcertModule } from './concert/concert.module';
import { ReservationModule } from './reservation/reservation.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from './concert/concert.entity';
import { User } from './user/user.entity';
import { Reservation } from './reservation/reservation.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'concerts.db',
      synchronize: true,
      entities: [Concert, User, Reservation],
    }),
    TypeOrmModule.forFeature([Concert, User, Reservation]),
    UserModule,
    ConcertModule,
    ReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
