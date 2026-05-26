import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NationalId } from '../nationa_id/entities/national-id.entity';
import { DeathCertificate } from '../death/entities/death-certificate.entity';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(NationalId)
    private nationalIdRepository: Repository<NationalId>,
    @InjectRepository(DeathCertificate)
    private deathRepository: Repository<DeathCertificate>,
  ) {}

  /**
   * Complete verification for NRB API
   * Checks: 1) ID exists, 2) Owner verification, 3) Malawian status, 4) Life/Death status
   */
  async checkLifeStatus(nationalIdNumber: string, surname: string): Promise<{
    success: boolean;
    verified: boolean;
    isAlive: boolean;
    isMalawian: boolean;
    message: string;
    data?: any;
  }> {
    
    // STEP 1: Find the national ID record
    const record = await this.nationalIdRepository.findOne({
      where: { 
        nationalIdNumber: nationalIdNumber
      }
    });

    // Check if ID exists in system
    if (!record) {
      return {
        success: false,
        verified: false,
        isAlive: false,
        isMalawian: false,
        message: 'National ID number not found in Malawi registry'
      };
    }

    // STEP 2: Verify the person is the legitimate owner (surname must match)
    if (record.surname.toLowerCase() !== surname.toLowerCase()) {
      return {
        success: false,
        verified: false,
        isAlive: false,
        isMalawian: record.nationality?.toUpperCase() === 'MALAWIAN',
        message: 'Verification failed: Surname does not match the national ID record'
      };
    }

    // STEP 3: Check if the person is Malawian
    const isMalawian = record.nationality?.toUpperCase() === 'MALAWIAN';
    
    if (!isMalawian) {
      return {
        success: false,
        verified: true,
        isAlive: false,
        isMalawian: false,
        message: 'This national ID belongs to a non-Malawian citizen. NRB verification only available for Malawian citizens.',
        data: {
          fullName: `${record.firstName} ${record.surname}`,
          surname: record.surname,
          dateOfBirth: record.dateOfBirth,
          nationality: record.nationality,
          nationalIdNumber: record.nationalIdNumber
        }
      };
    }

    // STEP 4: Check life/death status
    const isDeceased = record.isDeceased === true;
    
    if (isDeceased) {
      // Get death certificate details if available
      const deathRecord = await this.deathRepository.findOne({
        where: { deceasedNationalId: nationalIdNumber }
      });

      return {
        success: true,
        verified: true,
        isAlive: false,
        isMalawian: true,
        message: 'DECEASED - This Malawian citizen is recorded as deceased in the national registry',
        data: {
          fullName: `${record.firstName} ${record.surname}`,
          surname: record.surname,
          dateOfBirth: record.dateOfBirth,
          nationality: record.nationality,
          nationalIdNumber: record.nationalIdNumber,
          dateOfDeath: record.dateOfDeath || deathRecord?.dateOfDeath,
          deathCertificateNumber: record.deathCertificateNumber || deathRecord?.certificateNumber
        }
      };
    }

    // Person is ALIVE and verified
    return {
      success: true,
      verified: true,
      isAlive: true,
      isMalawian: true,
      message: 'ALIVE - This Malawian citizen is alive and verified in the national registry',
      data: {
        fullName: `${record.firstName} ${record.surname}`,
        surname: record.surname,
        dateOfBirth: record.dateOfBirth,
        nationality: record.nationality,
        nationalIdNumber: record.nationalIdNumber
      }
    };
  }

  /**
   * Simple boolean endpoint for external systems (NRB)
   * Returns just the essential information
   */
  async simpleLifeStatusCheck(nationalIdNumber: string, surname: string): Promise<{
    isValid: boolean;
    isMalawian: boolean;
    isAlive: boolean;
    message: string;
  }> {
    const result = await this.checkLifeStatus(nationalIdNumber, surname);
    
    return {
      isValid: result.verified,
      isMalawian: result.isMalawian,
      isAlive: result.isAlive,
      message: result.message
    };
  }

  // Original verification method (kept for backward compatibility)
  async verifyNationalId(nationalIdNumber: string, surname: string) {
    return this.checkLifeStatus(nationalIdNumber, surname);
  }

  async verifyDeathCertificate(certificateNumber: string, deceasedNationalId: string) {
    const record = await this.deathRepository.findOne({
      where: { 
        certificateNumber: certificateNumber,
        deceasedNationalId: deceasedNationalId,
        isValid: true 
      }
    });

    if (!record) {
      return {
        verified: false,
        message: 'Death certificate not found or invalid'
      };
    }

    return {
      verified: true,
      data: {
        deceasedName: `${record.firstName} ${record.surname}`,
        dateOfDeath: record.dateOfDeath,
        causeOfDeath: record.causeOfDeath,
        certificateNumber: record.certificateNumber
      }
    };
  }
}