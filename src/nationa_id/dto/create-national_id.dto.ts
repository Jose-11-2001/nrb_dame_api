import { 
  IsString, 
  IsDate, 
  IsEnum, 
  IsOptional, 
  IsNumber, 
  Min, 
  Max,
  IsPhoneNumber,
  Length,
  IsBoolean
} from 'class-validator';
import { Type } from 'class-transformer';

// Define enums locally instead of importing from Prisma
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

export class CreateNationalIdDto {
  @IsString()
  @Length(1, 50)
  firstName: string;

  @IsString()
  @IsOptional()
  otherNames?: string;

  @IsString()
  @Length(1, 50)
  surname: string;

  @IsString()
  nationality: string;

  @IsString()
  @IsOptional()
  secondNationality?: string;

  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  districtOfBirth: string;

  @IsString()
  taOfBirth: string;

  @IsString()
  villageOfBirth: string;

  @IsString()
  @IsOptional()
  birthCertificateNo?: string;

  @IsEnum(MaritalStatus)
  maritalStatus: MaritalStatus;

  @IsString()
  @IsOptional()
  eyeColor?: string;

  @IsNumber()
  @IsOptional()
  @Min(0.5)
  @Max(2.5)
  height?: number;

  @IsPhoneNumber()
  @IsOptional()
  mobilePhone?: string;

  @IsString()
  @IsOptional()
  passportNo?: string;

  @IsString()
  @IsOptional()
  disability?: string;

  @IsString()
  residentialDistrict: string;

  @IsString()
  residentialTA: string;

  @IsString()
  residentialVillage: string;

  @IsString()
  permanentDistrict: string;

  @IsString()
  permanentTA: string;

  @IsString()
  permanentVillage: string;

  @IsString()
  @IsOptional()
  motherIdNo?: string;

  @IsString()
  motherFullName: string;

  @IsString()
  motherNationality: string;

  @IsString()
  motherDistrict: string;

  @IsString()
  motherTA: string;

  @IsString()
  motherVillage: string;

  @IsString()
  @IsOptional()
  fatherIdNo?: string;

  @IsString()
  fatherFullName: string;

  @IsString()
  fatherNationality: string;

  @IsString()
  fatherDistrict: string;

  @IsString()
  fatherTA: string;

  @IsString()
  fatherVillage: string;

  @IsString()
  @Length(8, 15)
  firstWitnessIdNo: string;

  @IsString()
  @Length(8, 15)
  secondWitnessIdNo: string;
}