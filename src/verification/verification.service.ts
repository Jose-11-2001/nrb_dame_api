
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async verifyNationalId(nationalIdNumber: string, surname: string) {  
    const record = await this.nationalIdRepository.findOne({
      where: { 
        nationalIdNumber: nationalIdNumber,
        surname: surname,  
        isValid: true 
      }
    });

    if (!record) {
      return {
        verified: false,
        message: 'National ID not found or invalid'
      };
    }

    return {
      verified: true,
      data: {
        fullName: `${record.firstName} ${record.surname}`,  
        dateOfBirth: record.dateOfBirth,
        nationalIdNumber: record.nationalIdNumber
      }
    };
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