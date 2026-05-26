import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { NationalId } from '../nationa_id/entities/national-id.entity';
import { DeathCertificate } from '../death/entities/death-certificate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NationalId, DeathCertificate]),
  ],
  controllers: [VerificationController],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}