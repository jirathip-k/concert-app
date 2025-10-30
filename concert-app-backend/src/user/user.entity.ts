import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from '@/reservation/reservation.entity';
import { Role } from '@/common/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'text',
    default: Role.USER,
  })
  role: Role;

  @OneToMany(() => Reservation, (res) => res.user)
  reservations: Reservation[];
}
