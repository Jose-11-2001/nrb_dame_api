// src/nationa_id/entities/national-id.entity.ts
import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn,
  OneToMany 
} from 'typeorm';
import { SupportingDocument } from './supporting-document.entity';
import { VerificationLog } from './verification-log.entity';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum MaritalStatus {
  NEVER_MARRIED = 'NEVER_MARRIED',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
  SEPARATED = 'SEPARATED',
  ABANDONED = 'ABANDONED'
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED'
}

@Entity('national_id_applications')
export class NationalIdApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_number', unique: true })
  applicationNumber: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Applicant Details
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'other_names', nullable: true })
  otherNames: string;

  @Column()
  surname: string;

  @Column()
  nationality: string;

  @Column({ name: 'second_nationality', nullable: true })
  secondNationality: string;

  @Column({ name: 'date_of_birth', type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'varchar' })
  gender: string;

  @Column({ name: 'district_of_birth' })
  districtOfBirth: string;

  @Column({ name: 'ta_of_birth' })
  taOfBirth: string;

  @Column({ name: 'village_of_birth' })
  villageOfBirth: string;

  @Column({ name: 'birth_certificate_no', nullable: true })
  birthCertificateNo: string;

  @Column({ name: 'marital_status', type: 'varchar' })
  maritalStatus: string;

  @Column({ name: 'eye_color', nullable: true })
  eyeColor: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  height: number;

  @Column({ name: 'mobile_phone', nullable: true })
  mobilePhone: string;

  @Column({ name: 'passport_no', nullable: true })
  passportNo: string;

  @Column({ nullable: true, type: 'text' })
  disability: string;

  // Addresses
  @Column({ name: 'residential_district' })
  residentialDistrict: string;

  @Column({ name: 'residential_ta' })
  residentialTA: string;

  @Column({ name: 'residential_village' })
  residentialVillage: string;

  @Column({ name: 'permanent_district' })
  permanentDistrict: string;

  @Column({ name: 'permanent_ta' })
  permanentTA: string;

  @Column({ name: 'permanent_village' })
  permanentVillage: string;

  // Parents Details
  @Column({ name: 'mother_id_no', nullable: true })
  motherIdNo: string;

  @Column({ name: 'mother_full_name' })
  motherFullName: string;

  @Column({ name: 'mother_nationality' })
  motherNationality: string;

  @Column({ name: 'mother_district' })
  motherDistrict: string;

  @Column({ name: 'mother_ta' })
  motherTA: string;

  @Column({ name: 'mother_village' })
  motherVillage: string;

  @Column({ name: 'father_id_no', nullable: true })
  fatherIdNo: string;

  @Column({ name: 'father_full_name' })
  fatherFullName: string;

  @Column({ name: 'father_nationality' })
  fatherNationality: string;

  @Column({ name: 'father_district' })
  fatherDistrict: string;

  @Column({ name: 'father_ta' })
  fatherTA: string;

  @Column({ name: 'father_village' })
  fatherVillage: string;

  // Witnesses
  @Column({ name: 'first_witness_id_no' })
  firstWitnessIdNo: string;

  @Column({ name: 'first_witness_signature', nullable: true, type: 'text' })
  firstWitnessSignature: string;

  @Column({ name: 'second_witness_id_no' })
  secondWitnessIdNo: string;

  @Column({ name: 'second_witness_signature', nullable: true, type: 'text' })
  secondWitnessSignature: string;

  // Verification
  @Column({ name: 'applicant_signature', nullable: true, type: 'text' })
  applicantSignature: string;

  @Column({ name: 'application_date', type: 'timestamp' })
  applicationDate: Date;

  @Column({ name: 'village_head_id_no', nullable: true })
  villageHeadIdNo: string;

  @Column({ name: 'village_head_signature', nullable: true, type: 'text' })
  villageHeadSignature: string;

  @Column({ name: 'village_head_stamp', nullable: true, type: 'text' })
  villageHeadStamp: string;

  // Scoring System
  @Column({ name: 'citizenship_score', default: 0 })
  citizenshipScore: number;

  @Column({ name: 'is_eligible', default: false })
  isEligible: boolean;

  // Status
  @Column({ type: 'varchar', default: 'PENDING' })
  status: string;

  @Column({ name: 'rejection_reason', nullable: true, type: 'text' })
  rejectionReason: string;

  @OneToMany(() => SupportingDocument, (doc: SupportingDocument) => doc.nationalIdApplication)
  supportingDocuments: SupportingDocument[];

  @OneToMany(() => VerificationLog, (log: VerificationLog) => log.nationalIdApplication)
  verificationLogs: VerificationLog[];
}