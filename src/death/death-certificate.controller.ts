import { Controller, Post, Get, Put, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { DeathCertificateService } from './death-certificate.service';
import { CreateDeathCertificateDto } from './dto/create-death.dto';

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
  async searchByRegistration(@Param('deathCertificateNumber') deathCertificateNumber: string) {
    const certificate = await this.deathService.searchByCertificateNumber(deathCertificateNumber);
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
    if (!signature) {
      throw new BadRequestException('District Registrar Signature is required');
    }
    
    const certificate = await this.deathService.register(id, signature);
    return {
      success: true,
      data: certificate,
      message: 'Death certificate registered successfully and National ID has been marked as deceased',
    };
  }

  @Post(':id/approve')
  async approveCertificate(
    @Param('id') id: string,
    @Body('approvedBy') approvedBy: string,
  ) {
    if (!approvedBy) {
      throw new BadRequestException('Approved by is required');
    }
    
    const certificate = await this.deathService.approveCertificate(id, approvedBy);
    
    return {
      success: true,
      data: certificate,
      message: 'Death certificate approved successfully',
    };
  }

  @Post(':id/reject')
  async rejectCertificate(
    @Param('id') id: string,
    @Body('reason') reason: string,
    @Body('rejectedBy') rejectedBy: string,
  ) {
    if (!reason || !rejectedBy) {
      throw new BadRequestException('Reason and rejected by are required');
    }
    
    const certificate = await this.deathService.rejectCertificate(id, reason, rejectedBy);
    
    return {
      success: true,
      data: certificate,
      message: 'Death certificate rejected successfully',
    };
  }

  @Post('register')
  async createAndRegister(@Body() body: { 
    certificateData: CreateDeathCertificateDto, 
    signature: string 
  }) {
    const certificate = await this.deathService.registerDeath(
      body.certificateData, 
      body.signature
    );
    return {
      success: true,
      data: certificate,
      message: 'Death certificate registered and National ID updated successfully',
    };
  }

  @Post(':id/issue')
  async issueDeathCertificate(@Param('id') id: string) {
    const certificate = await this.deathService.issueCertificate(id);
    return {
      success: true,
      certificateNumber: certificate.certificateNumber,
      data: certificate,
      message: 'Death certificate issued successfully',
    };
  }

  @Get('debug/all')
  async debugAll() {
    const all = await this.deathService.findAll({});
    return {
      count: all.length,
      data: all,
      message: 'Debug: All death certificates retrieved',
    };
  }

  // ✅ FIXED: Verify death certificate by number (no guard)
  @Get('verify/:certificateNumber')
  async verifyDeathCertificate(@Param('certificateNumber') certificateNumber: string) {
    const result = await this.deathService.findByCertificateNumber(certificateNumber);
    
    return {
      verified: !!result,
      isValid: result?.isValid || false,
      message: result ? 'Death certificate is valid' : 'Death certificate not found',
      data: result ? {
        deceasedName: `${result.firstName} ${result.surname}`,
        dateOfDeath: result.dateOfDeath,
        causeOfDeath: result.causeOfDeath,
        certificateNumber: result.certificateNumber,
        dateOfIssue: result.issuedAt || result.createdAt
      } : null
    };
  }

  // ✅ FIXED: Verify by deceased National ID (no guard)
  @Get('verify/by-national-id/:nationalId')
  async verifyByDeceasedNationalId(@Param('nationalId') nationalId: string) {
    const results = await this.deathService.findByDeceasedNationalId(nationalId);
    
    return {
      verified: results.length > 0,
      hasDeathCertificate: results.length > 0,
      isDeceased: results.length > 0,
      count: results.length,
      certificates: results.map(cert => ({
        certificateNumber: cert.certificateNumber,
        dateOfDeath: cert.dateOfDeath,
        isValid: cert.isValid
      }))
    };
  }
}