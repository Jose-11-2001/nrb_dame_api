import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CheckLifeStatusDto {
  @IsString()
  @IsNotEmpty()
  nationalIdNumber: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsOptional()
  @IsString()
  apiKey?: string;
}

export class LifeStatusResponseDto {
  success: boolean;
  verified: boolean;
  isAlive: boolean;
  isMalawian: boolean;
  message: string;
  data?: {
    fullName: string;
    surname: string;
    dateOfBirth: Date;
    nationality: string;
    nationalIdNumber: string;
    dateOfDeath?: Date;
    deathCertificateNumber?: string;
  };
  error?: string;
}