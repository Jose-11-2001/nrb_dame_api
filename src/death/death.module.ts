// src/death/death.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeathCertificate } from '../death/entities/death-certificate.entity';
import { DeathCertificateService } from './death-certificate.service';
import { DeathCertificateController } from './death-certificate.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DeathCertificate])],
  controllers: [DeathCertificateController],
  providers: [DeathCertificateService],
  exports: [DeathCertificateService],
})
export class DeathModule {}