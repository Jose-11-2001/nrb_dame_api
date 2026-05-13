import { 
  IsString, 
  IsDate, 
  IsEnum, 
  IsOptional, 
  IsBoolean,
  Length,
  IsPhoneNumber
} from 'class-validator';
import { Type } from 'class-transformer';

export enum PlaceOfDeath {
  HEALTH_FACILITY = 'HEALTH_FACILITY',
  HOME = 'HOME',
  OTHER = 'OTHER'
}

export enum MannerOfDeath {
  NATURAL = 'NATURAL',
  ACCIDENT = 'ACCIDENT',
  HOMICIDE = 'HOMICIDE',
  SUICIDE = 'SUICIDE',
  PENDING_INVESTIGATION = 'PENDING_INVESTIGATION',
  COULD_NOT_BE_DETERMINED = 'COULD_NOT_BE_DETERMINED',
  OTHER = 'OTHER'
}

export enum AccidentType {
  MOTOR_VEHICLE_DRIVER = 'MOTOR_VEHICLE_DRIVER',
  MOTOR_VEHICLE_PASSENGER = 'MOTOR_VEHICLE_PASSENGER',
  MOTOR_VEHICLE_PEDESTRIAN = 'MOTOR_VEHICLE_PEDESTRIAN',
  DROWNING = 'DROWNING',
  OTHER = 'OTHER'
}

export enum YesNoUnknown {
  YES = 'YES',
  NO = 'NO',
  UNKNOWN = 'UNKNOWN'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export class CreateDeathCertificateDto {
  // Deceased Details
  @IsString()
  @Length(1, 50)
  surname: string;

  @IsString()
  @Length(1, 50)
  firstName: string;

  @IsString()
  @IsOptional()
  otherNames?: string;

  @IsString()
  @IsOptional()
  idNumber?: string;

  @IsString()
  nationality: string;

  @IsEnum(Gender)
  gender: Gender;

  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;

  @Type(() => Date)
  @IsDate()
  dateOfDeath: Date;

  @IsEnum(PlaceOfDeath)
  placeOfDeath: PlaceOfDeath;

  @IsString()
  @IsOptional()
  healthFacilityName?: string;

  @IsString()
  @IsOptional()
  healthFacilityAddress?: string;

  @IsString()
  @IsOptional()
  homeDistrict?: string;

  @IsString()
  @IsOptional()
  homeTA?: string;

  @IsString()
  @IsOptional()
  homeVillage?: string;

  @IsString()
  @IsOptional()
  otherPlaceDetails?: string;

  @IsEnum(MannerOfDeath)
  mannerOfDeath: MannerOfDeath;

  @IsEnum(AccidentType)
  @IsOptional()
  accidentType?: AccidentType;

  @IsString()
  @IsOptional()
  accidentDetails?: string;

  // Residential Address
  @IsString()
  residentialDistrict: string;

  @IsString()
  residentialTA: string;

  @IsString()
  residentialVillage: string;

  // Pregnancy
  @IsEnum(YesNoUnknown)
  @IsOptional()
  wasPregnant?: YesNoUnknown;

  @IsBoolean()
  @IsOptional()
  pregnantAtDeath?: boolean;

  // Mother Details
  @IsString()
  motherSurname: string;

  @IsString()
  motherFirstName: string;

  @IsString()
  @IsOptional()
  motherOtherNames?: string;

  @IsString()
  @IsOptional()
  motherIdNo?: string;

  @IsString()
  motherNationality: string;

  // Father Details
  @IsString()
  fatherSurname: string;

  @IsString()
  fatherFirstName: string;

  @IsString()
  @IsOptional()
  fatherOtherNames?: string;

  @IsString()
  @IsOptional()
  fatherIdNo?: string;

  @IsString()
  fatherNationality: string;

  // Informant Details
  @IsString()
  informantSurname: string;

  @IsString()
  informantFirstName: string;

  @IsString()
  @IsOptional()
  informantOtherNames?: string;

  @IsString()
  informantIdNo: string;

  @IsString()
  informantRelationship: string;

  @IsString()
  informantAddress: string;

  @IsString()
  @IsOptional()
  informantPostalAddress?: string;

  @IsPhoneNumber()
  @IsOptional()
  informantPhone?: string;
}