
import { 
  Controller, 
  Post, 
  Get,
  Body, 
  HttpCode, 
  HttpStatus, 
  UseGuards,
  Param,
  Query,
  BadRequestException
} from '@nestjs/common';
import { VerificationService } from './verification.service';
import { CheckLifeStatusDto } from './dto/life-status.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';

@Controller('api/v1/verify')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  /**
   * PRIMARY API FOR NRB
   * Complete verification with detailed response
   */
  @Post('life-status')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard)
  async checkLifeStatus(@Body() body: CheckLifeStatusDto) {
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
  @UseGuards(ApiKeyGuard)
  async simpleLifeStatusCheck(@Body() body: CheckLifeStatusDto) {
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
  @UseGuards(ApiKeyGuard)
  async checkLifeStatusGet(
    @Param('nationalIdNumber') nationalIdNumber: string,
    @Query('surname') surname: string
  ) {
    if (!surname) {
      throw new BadRequestException('Surname query parameter is required');
    }
    return this.verificationService.checkLifeStatus(nationalIdNumber, surname);
  }

  // Existing endpoints
  @Post('national-id')
  @HttpCode(HttpStatus.OK)
  async verifyNationalId(@Body() body: { nationalIdNumber: string; lastName: string }) {
    return this.verificationService.verifyNationalId(body.nationalIdNumber, body.lastName);
  }

  @Post('death-certificate')
  @HttpCode(HttpStatus.OK)
  async verifyDeathCertificate(@Body() body: { certificateNumber: string; deceasedNationalId: string }) {
    return this.verificationService.verifyDeathCertificate(body.certificateNumber, body.deceasedNationalId);
  }
}