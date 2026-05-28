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
  Head
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { NationalIdService } from './national_id.service';
import { CreateNationalIdDto } from './dto/create-national_id.dto';

@Controller('v1/national-id')
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

  @Get('application/:id')
  async findOne(@Param('id') id: string) {
    const application = await this.nationalIdService.findOne(id);
    return {
      success: true,
      data: application,
    };
  }

  @Get('issued/:id')
  async findIssuedId(@Param('id') id: string) {
    const nationalId = await this.nationalIdService.findIssuedIdById(id);
    return {
      success: true,
      data: nationalId,
      message: 'National ID retrieved successfully',
    };
  }

  @Get('search/by-surname/:surname')
  async searchBySurname(@Param('surname') surname: string) {
    const results = await this.nationalIdService.findBySurname(surname);
    return {
      success: true,
      data: results,
      count: results.length,
    };
  }

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

  @Get('verify/:nationalIdNumber')
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

  @Post('verify/batch')
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

  @Post(':id/approve')
  async approveApplication(
    @Param('id') id: string,
    @Body('approvedBy') approvedBy: string,
  ) {
    if (!approvedBy) {
      throw new BadRequestException('Approved by is required');
    }
    
    const application = await this.nationalIdService.approveApplication(id, approvedBy);
    const issuedId = await this.nationalIdService.findByApplicationId(id);
    
    return {
      success: true,
      data: application,
      nationalIdNumber: issuedId?.nationalIdNumber,
      message: 'Application approved successfully',
    };
  }

  @Post(':id/reject')
  async rejectApplication(
    @Param('id') id: string,
    @Body('reason') reason: string,
    @Body('rejectedBy') rejectedBy: string,
  ) {
    if (!reason || !rejectedBy) {
      throw new BadRequestException('Reason and rejected by are required');
    }
    
    const application = await this.nationalIdService.rejectApplication(id, reason, rejectedBy);
    
    return {
      success: true,
      data: application,
      message: 'Application rejected successfully',
    };
  }

  @Get('admin/all')
  async getAllForAdmin() {
    const applications = await this.nationalIdService.getAllApplicationsForAdmin();
    return {
      success: true,
      data: applications,
      count: applications.length,
    };
  }

  @Post(':id/issue')
  async issueNationalId(@Param('id') id: string) {
    const nationalId = await this.nationalIdService.issueNationalId(id);
    return {
      success: true,
      nationalIdNumber: nationalId.nationalIdNumber,
      data: nationalId,
      message: 'National ID issued successfully',
    };
  }

  @Get('debug/all')
  async debugAll() {
    const all = await this.nationalIdService.findAll({});
    return {
      count: all.length,
      data: all,
      message: 'Debug: All applications retrieved',
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

  // ============ NEW ID VERIFICATION ENDPOINTS ============

  @Get('check/:nationalIdNumber')
  async checkIdExists(@Param('nationalIdNumber') nationalIdNumber: string) {
    if (!nationalIdNumber || nationalIdNumber.length < 3) {
      throw new BadRequestException('Valid National ID number is required');
    }
    
    const result = await this.nationalIdService.checkIdExists(nationalIdNumber);
    
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('check/batch')
  async checkMultipleIdsExist(@Body() body: { nationalIdNumbers: string[] }) {
    if (!body.nationalIdNumbers || !Array.isArray(body.nationalIdNumbers)) {
      throw new BadRequestException('nationalIdNumbers array is required');
    }
    
    if (body.nationalIdNumbers.length === 0) {
      throw new BadRequestException('At least one national ID number is required');
    }
    
    if (body.nationalIdNumbers.length > 100) {
      throw new BadRequestException('Maximum 100 IDs per batch request');
    }
    
    const result = await this.nationalIdService.checkMultipleIdsExist(body.nationalIdNumbers);
    
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Head('check/:nationalIdNumber')
  async quickCheckExists(
    @Param('nationalIdNumber') nationalIdNumber: string,
    @Res() res: Response,
  ) {
    const result = await this.nationalIdService.checkIdExists(nationalIdNumber);
    
    if (result.exists && result.isValid) {
      res.status(200).send();
    } else if (result.exists && !result.isValid) {
      res.status(410).send();
    } else {
      res.status(404).send();
    }
  }

  @Get('search/by-id/:partialNumber')
  async searchByPartialId(@Param('partialNumber') partialNumber: string) {
    if (!partialNumber || partialNumber.length < 3) {
      throw new BadRequestException('Please provide at least 3 characters for search');
    }
    
    const results = await this.nationalIdService.searchByPartialId(partialNumber);
    
    return {
      success: true,
      data: results,
      count: results.length,
      message: results.length === 0 ? 'No matching IDs found' : `${results.length} ID(s) found`,
    };
  }

  @Get('details/:nationalIdNumber')
  async getIdDetails(@Param('nationalIdNumber') nationalIdNumber: string) {
    if (!nationalIdNumber) {
      throw new BadRequestException('National ID number is required');
    }
    
    const details = await this.nationalIdService.getIdDetails(nationalIdNumber);
    
    if (!details) {
      return {
        success: false,
        message: 'National ID not found',
        data: null,
      };
    }
    
    return {
      success: true,
      message: 'ID details retrieved successfully',
      data: {
        nationalIdNumber: details.nationalIdNumber,
        fullName: `${details.firstName} ${details.surname}`,
        firstName: details.firstName,
        surname: details.surname,
        dateOfBirth: details.dateOfBirth,
        gender: details.gender,
        isDeceased: details.isDeceased,
        issuedAt: details.issuedAt,
        isValid: details.isValid,
      },
    };
  }

  @Get('deceased-check/:nationalIdNumber')
  async checkDeceased(@Param('nationalIdNumber') nationalIdNumber: string) {
    const result = await this.nationalIdService.checkIfDeceased(nationalIdNumber);
    
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }
}