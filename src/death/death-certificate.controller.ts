
import { Controller, Post, Get, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { DeathCertificateService } from '../death/death-certificate.service';
import { CreateDeathCertificateDto } from '../death/dto/create-death.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';

@Controller('v1/death-certificate')
export class DeathCertificateController {
  constructor(private readonly deathService: DeathCertificateService) {}

  @Post()
  async create(@Body() createDto: CreateDeathCertificateDto) {
    const certificate = await this.deathService.create(createDto);
    return {
      success: true,
      data: certificate,
      message: 'Death certificate application submitted',
    };
  }

  @Get()
  async findAll(@Query('status') status?: string) {
    const filters: any = {};
    if (status) filters.status = status;
    
    const certificates = await this.deathService.findAll(filters);
    return {
      success: true,
      data: certificates,
    };
  }

  @Get('search')
  async search(@Query() query: { idNumber?: string; firstName?: string; surname?: string }) {
    const { idNumber, firstName, surname } = query;
    
    let certificates;
    
    if (idNumber) {
      certificates = await this.deathService.searchByIdNumber(idNumber);
    } else if (firstName && surname) {
      certificates = await this.deathService.searchByName(firstName, surname);
    } else {
      certificates = await this.deathService.findAll({});
    }
    
    return {
      success: true,
      data: certificates,
      count: certificates.length,
    };
  }

  @Get('search/registration/:deathCertificateNumber')
  async searchByRegistration(@Param('deathCertificateNumber') DeathCertificateNumber: string) {
    const certificate = await this.deathService.searchByCertificateNumber(DeathCertificateNumber);
    return {
      success: true,
      data: certificate,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const certificate = await this.deathService.findOne(id);
    return {
      success: true,
      data: certificate,
    };
  }

  @Put(':id/register')
  async registerDeath(
    @Param('id') id: string,
    @Body('districtRegistrarSignature') signature: string,
  ) {
    const certificate = await this.deathService.register(id, signature);
    return {
      success: true,
      data: certificate,
      message: 'Death certificate registered successfully',
    };
  }

  // ✅ NEW: Verify death certificate by number
  @Get('verify/:certificateNumber')
  @UseGuards(ApiKeyGuard)
  async verifyDeathCertificate(@Param('certificateNumber') certificateNumber: string) {
    const result = await this.deathService.findByCertificateNumber(certificateNumber);
    
    return {
      verified: !!result,
      isValid: result?.isValid || false,
      message: result ? 'Death certificate is valid' : 'Death certificate not found',
      data: result ? {
        deceasedName: `${result.firstName} ${result.surname}`,
        dateOfDeath: result.dateOfDeath,
        causeOfDeath: result.causeOfDeath
      } : null
    };
  }

  // ✅ NEW: Verify by deceased national ID
  @Get('verify/by-national-id/:nationalId')
  @UseGuards(ApiKeyGuard)
  async verifyByDeceasedNationalId(@Param('nationalId') nationalId: string) {
    const results = await this.deathService.findByDeceasedNationalId(nationalId);
    
    return {
      verified: results.length > 0,
      hasDeathCertificate: results.length > 0,
      count: results.length,
      certificates: results.map(cert => ({
        certificateNumber: cert.certificateNumber,
        dateOfDeath: cert.dateOfDeath,
        isValid: cert.isValid
      }))
    };
  }
}