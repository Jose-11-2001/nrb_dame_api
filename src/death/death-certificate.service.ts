// src/death/death-certificate.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { DeathCertificate } from '../death/entities/death-certificate.entity';
import { CreateDeathCertificateDto } from './dto/create-death.dto';

@Injectable()
export class DeathCertificateService {
  constructor(
    @InjectRepository(DeathCertificate)
    private deathCertRepo: Repository<DeathCertificate>,
  ) {}

  async create(createDto: CreateDeathCertificateDto) {
    // Generate unique certificate number
    const certificateNumber = `DTH/${new Date().getFullYear()}/${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    const certificate = this.deathCertRepo.create({
      certificateNumber, // ✅ Use certificateNumber, not registrationNumber
      ...createDto,
    });
    
    return this.deathCertRepo.save(certificate);
  }

  async findAll(filters: any) {
    return this.deathCertRepo.find({
      where: filters,
      order: { createdAt: 'DESC' },
    });
  }
async findByCertificateNumber(certificateNumber: string): Promise<DeathCertificate | null> {
  return this.deathCertRepo.findOne({ 
    where: { certificateNumber: certificateNumber }
  });
}

async findByDeceasedNationalId(nationalId: string): Promise<DeathCertificate[]> {
  return this.deathCertRepo.find({ 
    where: { deceasedNationalId: nationalId }
  });
}
  async findOne(id: string) {
    const certificate = await this.deathCertRepo.findOne({ where: { id } });
    if (!certificate) {
      throw new NotFoundException('Death certificate not found');
    }
    return certificate;
  }

  // Search by ID Number (National ID of deceased)
  async searchByIdNumber(idNumber: string) {
    return this.deathCertRepo.find({
      where: { idNumber: idNumber }, // or deceasedNationalId
      order: { createdAt: 'DESC' },
    });
  }

  // Search by Certificate Number
  async searchByCertificateNumber(certNumber: string) {
    const certificate = await this.deathCertRepo.findOne({
      where: { certificateNumber: certNumber }, // ✅ Use certificateNumber
    });
    
    if (!certificate) {
      throw new NotFoundException('Death certificate not found');
    }
    
    return certificate;
  }

  // Search by Name
  async searchByName(firstName: string, surname: string) {
    return this.deathCertRepo.find({
      where: [
        { firstName: Like(`%${firstName}%`), surname: Like(`%${surname}%`) },
        { firstName: Like(`%${firstName}%`) },
        { surname: Like(`%${surname}%`) },
      ],
      order: { createdAt: 'DESC' },
    });
  }

  async register(id: string, signature: string) {
    const certificate = await this.findOne(id);
    
    certificate.districtRegistrarSignature = signature;
    certificate.dateOfRegistration = new Date();
    certificate.status = 'REGISTERED';
    certificate.isValid = true;
    certificate.issuedAt = new Date();
    
    await this.deathCertRepo.save(certificate);
    return certificate;
  }

  // Verify death certificate (for external API)
  async verifyDeathCertificate(certificateNumber: string, deceasedNationalId: string) {
    const certificate = await this.deathCertRepo.findOne({
      where: { 
        certificateNumber: certificateNumber,
        deceasedNationalId: deceasedNationalId,
        isValid: true 
      },
    });

    if (!certificate) {
      return {
        verified: false,
        message: 'Death certificate not found or invalid'
      };
    }

    return {
      verified: true,
      message: 'Death certificate is valid',
      data: {
        deceasedName: `${certificate.firstName} ${certificate.surname}`,
        dateOfDeath: certificate.dateOfDeath,
        causeOfDeath: certificate.causeOfDeath,
        certificateNumber: certificate.certificateNumber,
        dateOfIssue: certificate.issuedAt,
      }
    };
  }
}