import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('death_certificates')
export class DeathCertificate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  registrationNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Deceased Details
  @Column()
  surname: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  otherNames: string;

  @Column({ nullable: true })
  idNumber: string;

  @Column()
  nationality: string;

  @Column()
  gender: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'date' })
  dateOfDeath: Date;

  @Column()
  placeOfDeath: string;

  @Column({ nullable: true })
  healthFacilityName: string;

  @Column({ nullable: true, type: 'text' })
  healthFacilityAddress: string;

  @Column({ nullable: true })
  homeDistrict: string;

  @Column({ nullable: true })
  homeTA: string;

  @Column({ nullable: true })
  homeVillage: string;

  @Column({ nullable: true, type: 'text' })
  otherPlaceDetails: string;

  @Column()
  mannerOfDeath: string;

  @Column({ nullable: true })
  accidentType: string;

  @Column({ nullable: true, type: 'text' })
  accidentDetails: string;

  // Residential Address
  @Column()
  residentialDistrict: string;

  @Column()
  residentialTA: string;

  @Column()
  residentialVillage: string;

  // Pregnancy
  @Column({ nullable: true })
  wasPregnant: string;

  @Column({ nullable: true, type: 'boolean' })
  pregnantAtDeath: boolean;

  // Mother Details
  @Column()
  motherSurname: string;

  @Column()
  motherFirstName: string;

  @Column({ nullable: true })
  motherOtherNames: string;

  @Column({ nullable: true })
  motherIdNo: string;

  @Column()
  motherNationality: string;

  // Father Details
  @Column()
  fatherSurname: string;

  @Column()
  fatherFirstName: string;

  @Column({ nullable: true })
  fatherOtherNames: string;

  @Column({ nullable: true })
  fatherIdNo: string;

  @Column()
  fatherNationality: string;

  // Informant Details
  @Column()
  informantSurname: string;

  @Column()
  informantFirstName: string;

  @Column({ nullable: true })
  informantOtherNames: string;

  @Column()
  informantIdNo: string;

  @Column()
  informantRelationship: string;

  @Column({ type: 'text' })
  informantAddress: string;

  @Column({ nullable: true, type: 'text' })
  informantPostalAddress: string;

  @Column({ nullable: true })
  informantPhone: string;

  @Column({ nullable: true, type: 'text' })
  informantSignature: string;

  @Column({ nullable: true, type: 'timestamp' })
  informantDate: Date;

  // Village Head Verification
  @Column({ nullable: true })
  villageHeadName: string;

  @Column({ nullable: true })
  villageHeadIdNo: string;

  @Column({ nullable: true, type: 'text' })
  villageHeadSignature: string;

  @Column({ nullable: true, type: 'timestamp' })
  villageHeadDate: Date;

  @Column({ nullable: true, type: 'text' })
  villageHeadStamp: string;

  // Status
  @Column({ default: 'PENDING' })
  status: string;

  // Official Use
  @Column({ nullable: true, type: 'text' })
  districtRegistrarSignature: string;

  @Column({ nullable: true, type: 'timestamp' })
  dateOfRegistration: Date;

  @Column({ nullable: true })
  deathEntryNumber: string;

  @Column({ nullable: true, type: 'text' })
  officialStamp: string;
}