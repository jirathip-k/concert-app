import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from 'src/reservation/reservation.entity';

@Entity()
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  totalSeats: number;

  @OneToMany(() => Reservation, (res) => res.concert)
  reservations: Reservation[];
}
