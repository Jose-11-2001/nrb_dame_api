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

  @Column({ nullable: true })
  otherNames?: string;

  @Column({ nullable: true })
  idNumber?: string;

  @Column({ default: 'MALAWIAN' })
  nationality: string;

  @Column()
  gender: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'date' })
  dateOfDeath: Date;

  @Column({ nullable: true, type: 'text' })
  causeOfDeath: string;

  @Column({ nullable: true })
  placeOfDeath: string;

  @Column({ nullable: true })
  healthFacilityName?: string;

  @Column({ nullable: true })
  mannerOfDeath: string;

  // Addresses
  @Column()
  residentialDistrict: string;

  @Column()
  residentialTA: string;

  @Column()
  residentialVillage: string;

  // Parents
  @Column()
  motherSurname: string;

  @Column()
  motherFirstName: string;

  @Column()
  motherNationality: string;

  @Column()
  fatherSurname: string;

  @Column()
  fatherFirstName: string;

  @Column()
  fatherNationality: string;

  // Informant
  @Column()
  informantSurname: string;

  @Column()
  informantFirstName: string;

  @Column()
  informantIdNo: string;

  @Column()
  informantRelationship: string;

  @Column()
  informantAddress: string;

  @Column({ nullable: true })
  informantPostalAddress?: string;

  @Column({ nullable: true })
  informantPhone?: string;

  // Status fields
  @Column({ default: 'PENDING' })
  status: string;

  @Column({ nullable: true, type: 'text' })
  districtRegistrarSignature: string;

  @Column({ nullable: true, type: 'timestamp' })
  dateOfRegistration: Date;

  @Column({ nullable: true, type: 'timestamp' })
  issuedAt: Date;

  @Column({ nullable: true, type: 'text' })
  rejectionReason: string;

  @Column({ default: false })
  isValid: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}