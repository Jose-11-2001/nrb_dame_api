import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeathCertificateController } from './death-certificate.controller';
import { DeathCertificateService } from './death-certificate.service';
import { DeathCertificate } from './entities/death-certificate.entity';
import { NationalId } from '../nationa_id/entities/national-id.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeathCertificate, NationalId]),
  ],
  controllers: [DeathCertificateController],
  providers: [DeathCertificateService],
  exports: [DeathCertificateService],
})
export class DeathModule {}