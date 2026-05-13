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

  @Column({ unique: true })
  applicationNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Applicant Details
  @Column()
  firstName: string;

  @Column({ nullable: true })
  otherNames: string;

  @Column()
  surname: string;

  @Column()
  nationality: string;

  @Column({ nullable: true })
  secondNationality: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'varchar' })
  gender: string;

  @Column()
  districtOfBirth: string;

  @Column()
  taOfBirth: string;

  @Column()
  villageOfBirth: string;

  @Column({ nullable: true })
  birthCertificateNo: string;

  @Column({ type: 'varchar' })
  maritalStatus: string;

  @Column({ nullable: true })
  eyeColor: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  height: number;

  @Column({ nullable: true })
  mobilePhone: string;

  @Column({ nullable: true })
  passportNo: string;

  @Column({ nullable: true, type: 'text' })
  disability: string;

  // Addresses
  @Column()
  residentialDistrict: string;

  @Column()
  residentialTA: string;

  @Column()
  residentialVillage: string;

  @Column()
  permanentDistrict: string;

  @Column()
  permanentTA: string;

  @Column()
  permanentVillage: string;

  // Parents Details
  @Column({ nullable: true })
  motherIdNo: string;

  @Column()
  motherFullName: string;

  @Column()
  motherNationality: string;

  @Column()
  motherDistrict: string;

  @Column()
  motherTA: string;

  @Column()
  motherVillage: string;

  @Column({ nullable: true })
  fatherIdNo: string;

  @Column()
  fatherFullName: string;

  @Column()
  fatherNationality: string;

  @Column()
  fatherDistrict: string;

  @Column()
  fatherTA: string;

  @Column()
  fatherVillage: string;

  // Witnesses
  @Column()
  firstWitnessIdNo: string;

  @Column({ nullable: true, type: 'text' })
  firstWitnessSignature: string;

  @Column()
  secondWitnessIdNo: string;

  @Column({ nullable: true, type: 'text' })
  secondWitnessSignature: string;

  // Verification
  @Column({ nullable: true, type: 'text' })
  applicantSignature: string;

  @Column({ type: 'timestamp' })
  applicationDate: Date;

  @Column({ nullable: true })
  villageHeadIdNo: string;

  @Column({ nullable: true, type: 'text' })
  villageHeadSignature: string;

  @Column({ nullable: true, type: 'text' })
  villageHeadStamp: string;

  // Scoring System
  @Column({ default: 0 })
  citizenshipScore: number;

  @Column({ default: false })
  isEligible: boolean;

  // Status
  @Column({ type: 'varchar', default: 'PENDING' })
  status: string;

  @Column({ nullable: true, type: 'text' })
  rejectionReason: string;

  @OneToMany(() => SupportingDocument, (doc: SupportingDocument) => doc.nationalIdApplication)
  supportingDocuments: SupportingDocument[];

  @OneToMany(() => VerificationLog, (log: VerificationLog) => log.nationalIdApplication)
  verificationLogs: VerificationLog[];
}