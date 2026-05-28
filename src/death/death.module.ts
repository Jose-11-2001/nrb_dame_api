import { Module } from '@nestjs/common';
import { VerificationController } from '../verification/verification.controller';
import { VerificationService } from '../verification/verification.service';

@Module({
  controllers: [VerificationController],
  providers: [VerificationService],
})
export class VerificationModule {}