import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  locationId: string;

  @Column()
  macAddress: string;

  @Column()
  name: string;

  @Column()
  capacity: number;
}