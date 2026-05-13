
import { 
  Controller, 
  Post, 
  Get, 
  Put, 
  Body, 
  Param, 
  Query, 
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile,
  BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { NationalIdService } from './national_id.service';
import { CreateNationalIdDto } from './dto/create-national_id.dto';

@Controller('v1/national-id')  // Changed: removed 'api/' since global prefix adds it
export class NationalIdController {
  constructor(private readonly nationalIdService: NationalIdService) {}

  @Post()
  async create(@Body() createDto: CreateNationalIdDto) {
    const application = await this.nationalIdService.create(createDto);
    return {
      success: true,
      data: application,
      message: 'Application submitted successfully',
    };
  }

  @Post(':id/documents')
  @UseInterceptors(FileInterceptor('document'))
  async uploadDocument(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('documentType') documentType: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    
    const document = await this.nationalIdService.uploadDocument(id, file, documentType);
    return {
      success: true,
      data: document,
      message: 'Document uploaded successfully',
    };
  }

  @Get()
  async findAll(
    @Query('status') status?: string,
    @Query('district') district?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const filters: any = {};
    if (status) filters.status = status;
    if (district) filters.district = district;
    if (startDate && endDate) {
      filters.startDate = new Date(startDate);
      filters.endDate = new Date(endDate);
    }
    
    const applications = await this.nationalIdService.findAll(filters);
    return {
      success: true,
      data: applications,
      count: applications.length,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const application = await this.nationalIdService.findOne(id);
    return {
      success: true,
      data: application,
    };
  }

  @Put(':id/verify-village')
  async verifyByVillageHead(
    @Param('id') id: string,
    @Body('villageHeadIdNo') villageHeadIdNo: string,
    @Body('signature') signature: string,
  ) {
    if (!villageHeadIdNo) {
      throw new BadRequestException('Village Head ID is required');
    }
    
    const application = await this.nationalIdService.verifyByVillageHead(
      id,
      villageHeadIdNo,
      signature,
    );
    return {
      success: true,
      data: application,
      message: 'Application verified by Village Head',
    };
  }

  @Get('reports/download')
  async downloadReport(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!startDate || !endDate) {
      throw new BadRequestException('Start date and end date are required');
    }
    
    const report = await this.nationalIdService.generateReport(
      new Date(startDate),
      new Date(endDate),
    );
    
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename=national-id-report-${Date.now()}.xlsx`,
    });
    
    return new StreamableFile(report);
  }
}