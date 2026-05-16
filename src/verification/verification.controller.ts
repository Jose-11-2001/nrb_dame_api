// src/verification/verification.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { VerificationService } from './verification.service';
//import { Public } from '../auth/public.decorator';

@Controller('api/v1/verify')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  // @Public()
  @Post('national-id')
  @HttpCode(HttpStatus.OK)
  async verifyNationalId(@Body() body: { nationalIdNumber: string; lastName: string }) {
    return this.verificationService.verifyNationalId(body.nationalIdNumber, body.lastName);
  }

  // @Public()
  @Post('death-certificate')
  @HttpCode(HttpStatus.OK)
  async verifyDeathCertificate(@Body() body: { certificateNumber: string; deceasedNationalId: string }) {
    return this.verificationService.verifyDeathCertificate(body.certificateNumber, body.deceasedNationalId);
  }
}