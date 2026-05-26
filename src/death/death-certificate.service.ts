import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { DeathCertificate } from './entities/death-certificate.entity';
import { NationalId } from '../nationa_id/entities/national-id.entity';
import { CreateDeathCertificateDto } from './dto/create-death.dto';

@Injectable()
export class DeathCertificateService {
  constructor(
    @InjectRepository(DeathCertificate)
    private deathCertRepo: Repository<DeathCertificate>,
    
    @InjectRepository(NationalId)
    private nationalIdRepo: Repository<NationalId>,
  ) {}

  async create(createDto: CreateDeathCertificateDto) {
    const certificateNumber = `DTH/${new Date().getFullYear()}/${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    const certificate = this.deathCertRepo.create({
      certificateNumber,
      ...createDto,
      status: 'PENDING',
      isValid: false,
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

  async searchByIdNumber(idNumber: string) {
    return this.deathCertRepo.find({
      where: { deceasedNationalId: idNumber },
      order: { createdAt: 'DESC' },
    });
  }

  async searchByCertificateNumber(certNumber: string) {
    const certificate = await this.deathCertRepo.findOne({
      where: { certificateNumber: certNumber },
    });
    
    if (!certificate) {
      throw new NotFoundException('Death certificate not found');
    }
    
    return certificate;
  }

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
    
    if (certificate.status === 'REGISTERED') {
      throw new BadRequestException('Death certificate is already registered');
    }
    
    const nationalIdRecord = await this.nationalIdRepo.findOne({
      where: { nationalIdNumber: certificate.deceasedNationalId }
    });
    
    if (!nationalIdRecord) {
      throw new NotFoundException(`National ID ${certificate.deceasedNationalId} not found in registry`);
    }
    
    certificate.districtRegistrarSignature = signature;
    certificate.dateOfRegistration = new Date();
    certificate.status = 'REGISTERED';
    certificate.isValid = true;
    certificate.issuedAt = new Date();
    
    await this.deathCertRepo.save(certificate);
    
    await this.nationalIdRepo.update(
      { nationalIdNumber: certificate.deceasedNationalId },
      {
        isDeceased: true,
        dateOfDeath: certificate.dateOfDeath,
        deathCertificateNumber: certificate.certificateNumber,
        isValid: false,
      }
    );
    
    return certificate;
  }

  async approveCertificate(id: string, approvedBy: string): Promise<DeathCertificate> {
    const certificate = await this.findOne(id);
    
    if (certificate.status !== 'REGISTERED') {
      throw new BadRequestException('Certificate must be registered before approval');
    }
    
    certificate.status = 'APPROVED';
    certificate.isValid = true;
    certificate.issuedAt = new Date();
    await this.deathCertRepo.save(certificate);
    
    return certificate;
  }

  async rejectCertificate(id: string, reason: string, rejectedBy: string): Promise<DeathCertificate> {
    const certificate = await this.findOne(id);
    
    certificate.status = 'REJECTED';
    certificate.rejectionReason = reason;
    await this.deathCertRepo.save(certificate);
    
    return certificate;
  }

  async issueCertificate(id: string): Promise<DeathCertificate> {
    const certificate = await this.findOne(id);
    
    if (certificate.status !== 'REGISTERED' && certificate.status !== 'APPROVED') {
      throw new BadRequestException('Certificate must be registered/approved before issuance');
    }
    
    if (certificate.isValid) {
      throw new BadRequestException('Certificate is already issued');
    }
    
    certificate.isValid = true;
    certificate.issuedAt = new Date();
    certificate.status = 'ISSUED';
    
    await this.deathCertRepo.save(certificate);
    
    return certificate;
  }

  async registerDeath(createDto: CreateDeathCertificateDto, registrarSignature: string) {
    const nationalIdRecord = await this.nationalIdRepo.findOne({
      where: { nationalIdNumber: createDto.deceasedNationalId }
    });
    
    if (!nationalIdRecord) {
      throw new NotFoundException(`National ID ${createDto.deceasedNationalId} not found in registry`);
    }
    
    const certificateNumber = `DTH/${new Date().getFullYear()}/${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    const certificate = this.deathCertRepo.create({
      certificateNumber,
      ...createDto,
      districtRegistrarSignature: registrarSignature,
      dateOfRegistration: new Date(),
      status: 'REGISTERED',
      isValid: true,
      issuedAt: new Date(),
    });
    
    const savedCertificate = await this.deathCertRepo.save(certificate);
    
    await this.nationalIdRepo.update(
      { nationalIdNumber: createDto.deceasedNationalId },
      {
        isDeceased: true,
        dateOfDeath: createDto.dateOfDeath,
        deathCertificateNumber: savedCertificate.certificateNumber,
        isValid: false,
      }
    );
    
    return savedCertificate;
  }

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
        dateOfIssue: certificate.issuedAt || certificate.createdAt,
      }
    };
  }
}