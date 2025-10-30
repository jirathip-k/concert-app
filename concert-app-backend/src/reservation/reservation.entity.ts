import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';

import { User } from '@/user/user.entity';
import { Concert } from '@/concert/concert.entity';

export enum ReservationAction {
  RESERVED = 'reserved',
  CANCELED = 'canceled',
}

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ManyToOne(() => Concert, (concert) => concert.reservations)
  concert: Concert;

  @Column({
    type: 'text',
    enum: ReservationAction,
    default: ReservationAction.RESERVED,
  })
  action: ReservationAction;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}
