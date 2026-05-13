// src/death/death-certificate.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeathCertificate } from '../death/entities/death-certificate.entity';
import { CreateDeathCertificateDto } from './dto/create-death.dto';

@Injectable()
export class DeathCertificateService {
  constructor(
    @InjectRepository(DeathCertificate)
    private deathCertRepo: Repository<DeathCertificate>,
  ) {}

  async create(createDto: CreateDeathCertificateDto) {
    const registrationNumber = `DTH/${new Date().getFullYear()}/${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    const certificate = this.deathCertRepo.create({
      registrationNumber,
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

  async findOne(id: string) {
    return this.deathCertRepo.findOne({ where: { id } });
  }

  async register(id: string, signature: string) {
    await this.deathCertRepo.update(id, {
      districtRegistrarSignature: signature,
      dateOfRegistration: new Date(),
      status: 'REGISTERED',
    });
    
    return this.findOne(id);
  }
}