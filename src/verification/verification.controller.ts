import { 
  Controller, 
  Post, 
  Get,
  Body, 
  HttpCode, 
  HttpStatus, 
  Param,
  Query,
  BadRequestException
} from '@nestjs/common';
import { VerificationService } from './verification.service';

@Controller('api/v1/verify')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  /**
   * Health check endpoint
   */
  @Get('health')
  async healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'NRB Dame API',
    };
  }

  /**
   * PRIMARY API FOR NRB
   * Complete verification with detailed response
   */
  @Post('life-status')
  @HttpCode(HttpStatus.OK)
  async checkLifeStatus(@Body() body: { nationalIdNumber: string; surname: string }) {
    const result = await this.verificationService.checkLifeStatus(
      body.nationalIdNumber, 
      body.surname
    );
    return result;
  }

  /**
   * SIMPLE API FOR NRB
   * Returns just the essential boolean values
   */
  @Post('life-status/simple')
  @HttpCode(HttpStatus.OK)
  async simpleLifeStatusCheck(@Body() body: { nationalIdNumber: string; surname: string }) {
    const result = await this.verificationService.simpleLifeStatusCheck(
      body.nationalIdNumber, 
      body.surname
    );
    return result;
  }

  /**
   * GET endpoint for easy testing
   */
  @Get('life-status/:nationalIdNumber')
  async checkLifeStatusGet(
    @Param('nationalIdNumber') nationalIdNumber: string,
    @Query('surname') surname: string
  ) {
    if (!surname) {
      throw new BadRequestException('Surname query parameter is required');
    }
    return this.verificationService.checkLifeStatus(nationalIdNumber, surname);
  }

  /**
   * Batch verification endpoint
   */
  @Post('verify-batch')
  @HttpCode(HttpStatus.OK)
  async verifyBatch(@Body() body: { nationalIdNumbers: string[] }) {
    if (!body.nationalIdNumbers || !Array.isArray(body.nationalIdNumbers)) {
      throw new BadRequestException('nationalIdNumbers array is required');
    }
    
    const results = await Promise.all(
      body.nationalIdNumbers.map(async (id) => {
        return this.verificationService.simpleLifeStatusCheck(id, '');
      })
    );
    
    return {
      success: true,
      results: body.nationalIdNumbers.map((id, index) => ({
        nationalIdNumber: id,
        ...results[index]
      })),
      total: body.nationalIdNumbers.length
    };
  }

  /**
   * Verify National ID (legacy endpoint)
   */
  @Post('national-id')
  @HttpCode(HttpStatus.OK)
  async verifyNationalId(@Body() body: { nationalIdNumber: string; lastName: string }) {
    return this.verificationService.verifyNationalId(body.nationalIdNumber, body.lastName);
  }

  /**
   * Verify Death Certificate
   */
  @Post('death-certificate')
  @HttpCode(HttpStatus.OK)
  async verifyDeathCertificate(@Body() body: { certificateNumber: string; deceasedNationalId: string }) {
    return this.verificationService.verifyDeathCertificate(body.certificateNumber, body.deceasedNationalId);
  }
}