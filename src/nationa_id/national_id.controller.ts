import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Body, 
  Param, 
  Query, 
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { NationalIdService } from './national_id.service';
import { CreateNationalIdDto } from './dto/create-national_id.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';

@Controller('v1/national-id')
export class NationalIdController {
  constructor(private readonly nationalIdService: NationalIdService) {}

  // ✅ CREATE new application
  @Post()
  async create(@Body() createDto: CreateNationalIdDto) {
    const application = await this.nationalIdService.create(createDto);
    return {
      success: true,
      data: application,
      message: 'Application submitted successfully',
    };
  }

  // ✅ UPLOAD documents for an application
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

  // ✅ GET all applications (with filters)
  @Get()
  async findAll(
    @Query('status') status?: string,
    @Query('district') district?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const filters: any = {};
    if (status) filters.status = status;
    if (district) filters.district = district;
    if (startDate && endDate) {
      filters.startDate = new Date(startDate);
      filters.endDate = new Date(endDate);
    }
    
    // If no filters, return issued IDs for dashboard
    if (Object.keys(filters).length === 0 && !status && !district) {
      const issuedIds = await this.nationalIdService.findAllIssuedIds();
      return {
        success: true,
        data: issuedIds,
        count: issuedIds.length,
        message: 'Issued National IDs retrieved successfully',
      };
    }
    
    const applications = await this.nationalIdService.findAll(filters);
    return {
      success: true,
      data: applications,
      count: applications.length,
    };
  }

  // ✅ GET single application by ID
  @Get('application/:id')
  async findOne(@Param('id') id: string) {
    const application = await this.nationalIdService.findOne(id);
    return {
      success: true,
      data: application,
    };
  }

  // ✅ GET issued National ID by ID
  @Get('issued/:id')
  async findIssuedId(@Param('id') id: string) {
    const nationalId = await this.nationalIdService.findIssuedIdById(id);
    return {
      success: true,
      data: nationalId,
      message: 'National ID retrieved successfully',
    };
  }

  // ✅ SEARCH by surname
  @Get('search/by-surname/:surname')
  async searchBySurname(@Param('surname') surname: string) {
    const results = await this.nationalIdService.findBySurname(surname);
    return {
      success: true,
      data: results,
      count: results.length,
    };
  }

  // ✅ GET dashboard statistics
  @Get('stats/dashboard')
  async getDashboardStats() {
    const stats = await this.nationalIdService.getStatistics();
    const recent = await this.nationalIdService.getRecentIssued(5);
    const pending = await this.nationalIdService.getPendingCount();
    
    return {
      success: true,
      data: {
        statistics: stats,
        recentIssuances: recent,
        pendingApplications: pending,
      },
    };
  }

  // ✅ VERIFY endpoint (with surname query parameter)
  @Get('verify/:nationalIdNumber')
  @UseGuards(ApiKeyGuard)
  async verifyNationalId(
    @Param('nationalIdNumber') nationalIdNumber: string,
    @Query('surname') surname: string,
  ) {
    if (!surname) {
      throw new BadRequestException('Surname query parameter is required');
    }
    
    const result = await this.nationalIdService.verifyNationalId(nationalIdNumber, surname);
    
    return {
      verified: result.verified,
      isValid: result.isValid,
      message: result.message,
      data: result.data
    };
  }

  // ✅ BULK verification endpoint
  @Post('verify/batch')
  @UseGuards(ApiKeyGuard)
  async verifyMultipleNationalIds(@Body() body: { nationalIdNumbers: string[] }) {
    if (!body.nationalIdNumbers || !Array.isArray(body.nationalIdNumbers)) {
      throw new BadRequestException('nationalIdNumbers array is required');
    }
    
    const results = await Promise.all(
      body.nationalIdNumbers.map(async (id) => {
        const result = await this.nationalIdService.findByNationalIdNumber(id);
        return {
          nationalIdNumber: id,
          verified: !!result,
          isValid: result?.isValid || false,
          isDeceased: result?.isDeceased || false,
          fullName: result ? `${result.firstName} ${result.surname}` : null,
        };
      })
    );
    
    return { results, total: results.length };
  }

  // ✅ VILLAGE HEAD verification
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

  // ✅ DOWNLOAD report
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