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

  @Column('text')
  causeOfDeath: string;

  @Column({ nullable: true })
  placeOfDeath: string;

  @Column({ default: false })
  isValid: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}