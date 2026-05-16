// src/nationa_id/entities/national-id.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('national_ids')
export class NationalId {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nationalIdNumber: string;

  @Column()
  firstName: string;

  @Column()
  surname: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  gender: string;

  @Column()
  placeOfBirth: string;

  @Column()
  fatherName: string;

  @Column()
  motherName: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column({ default: true })
  isValid: boolean;

  @Column({ nullable: true, type: 'timestamp' })
  issuedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}