import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Concert } from 'src/concert/concert.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ManyToOne(() => Concert, (concert) => concert.reservations)
  concert: Concert;
}
