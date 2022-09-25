import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Compartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unitId: number;

  @Column()
  macAddress: string;

  @Column()
  capacity: number;
}