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

  @Column({ default: 'MALAWIAN' })
  nationality: string;

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

  @Column({ default: false })
  isDeceased: boolean;

  @Column({ nullable: true, type: 'date' })
  dateOfDeath: Date;

  @Column({ nullable: true })
  deathCertificateNumber: string;

  @Column({ nullable: true, type: 'timestamp' })
  issuedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}