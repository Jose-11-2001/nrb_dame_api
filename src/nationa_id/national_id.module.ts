

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NationalIdController } from './national_id.controller';
import { NationalIdService } from './national_id.service';
import { NationalIdApplication } from './entities/nationalIdApplication.entity';
import { SupportingDocument } from './entities/supporting-document.entity';
import { VerificationLog } from './entities/verification-log.entity';
import { NationalId } from './entities/national-id.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NationalIdApplication,
      SupportingDocument,
      VerificationLog,
      NationalId,
    ]),
  ],
  controllers: [NationalIdController],
  providers: [NationalIdService],
  exports: [NationalIdService],
})
export class NationalIdModule {}