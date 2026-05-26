import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('death_certificates')
export class DeathCertificate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  certificateNumber: string;

  @Column()
  deceasedNationalId: string;

  @Column()
  firstName: string;

  @Column()
  surname: string;

  @Column({ type: 'date' })
  dateOfDeath: Date;

  @Column({ type: 'text' })
  causeOfDeath: string;

  @Column({ nullable: true })
  placeOfDeath: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  village: string;

  @Column({ nullable: true })
  ta: string;

  @Column({ nullable: true, type: 'text' })
  districtRegistrarSignature: string;

  @Column({ type: 'timestamp', nullable: true })
  dateOfRegistration: Date;

  @Column({ default: 'PENDING' })
  status: string;

  @Column({ default: false })
  isValid: boolean;

  @Column({ type: 'timestamp', nullable: true })
  issuedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}