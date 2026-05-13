
import { Controller, Post, Get, Put, Body, Param, Query } from '@nestjs/common';
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
}