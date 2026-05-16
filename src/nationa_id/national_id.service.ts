
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NationalIdApplication, ApplicationStatus } from './entities/nationalIdApplication.entity';
import { NationalId } from './entities/national-id.entity';  // ✅ Simple National ID entity for issued IDs
import { SupportingDocument } from './entities/supporting-document.entity';
import { VerificationLog } from './entities/verification-log.entity';
import { CreateNationalIdDto } from './dto/create-national_id.dto';

@Injectable()
export class NationalIdService {
  constructor(
    // Repository for applications (full details, documents, verification)
    @InjectRepository(NationalIdApplication)
    private nationalIdAppRepo: Repository<NationalIdApplication>,
    
    // ✅ Repository for issued IDs (only final, verified ID records)
    @InjectRepository(NationalId)
    private nationalIdRepo: Repository<NationalId>,
    
    @InjectRepository(SupportingDocument)
    private documentRepo: Repository<SupportingDocument>,
    
    @InjectRepository(VerificationLog)
    private logRepo: Repository<VerificationLog>,
  ) {}

  private calculateCitizenshipScore(dto: CreateNationalIdDto): number {
    let score = 0;

    // Biological parent's National ID (100 points)
    if (dto.motherIdNo || dto.fatherIdNo) {
      score += 100;
    }

    // Two community witnesses (100 points)
    if (dto.firstWitnessIdNo && dto.secondWitnessIdNo) {
      score += 100;
    }

    return score;
  }
// Add this method to your NationalIdService
async verifyNationalId(nationalIdNumber: string, surname: string): Promise<{
  verified: boolean;
  isValid: boolean;
  message: string;
  data?: any;
}> {
  const result = await this.findByNationalIdNumber(nationalIdNumber);
  
  if (!result) {
    return {
      verified: false,
      isValid: false,
      message: 'National ID not found'
    };
  }
  
  // Verify surname matches
  if (result.surname.toLowerCase() !== surname.toLowerCase()) {
    return {
      verified: false,
      isValid: false,
      message: 'Surname does not match the national ID record'
    };
  }
  
  return {
    verified: true,
    isValid: result.isValid,
    message: result.isValid ? 'National ID is valid' : 'National ID is invalid or expired',
    data: {
      fullName: `${result.firstName} ${result.surname}`,
      dateOfBirth: result.dateOfBirth,
      gender: result.gender,
      nationalIdNumber: result.nationalIdNumber,
    }
  };
}
  async create(createDto: CreateNationalIdDto) {
    // Generate application number
    const applicationNumber = `NR1/${new Date().getFullYear()}/${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    // Calculate citizenship score
    const citizenshipScore = this.calculateCitizenshipScore(createDto);
    const isEligible = citizenshipScore >= 100;

    const application = this.nationalIdAppRepo.create({
      applicationNumber,
      ...createDto,
      citizenshipScore,
      isEligible,
      status: isEligible ? ApplicationStatus.VERIFIED : ApplicationStatus.PENDING,
      applicationDate: new Date(),
    });

    const savedApplication = await this.nationalIdAppRepo.save(application);

    // Create verification logs
    if (!isEligible) {
      await this.createVerificationLog(
        savedApplication.id,
        'Insufficient citizenship proof',
        `Score: ${citizenshipScore}/100`
      );
    }

    return savedApplication;
  }

  async uploadDocument(applicationId: string, file: Express.Multer.File, documentType: string) {
    // Check if application exists
    const application = await this.nationalIdAppRepo.findOne({ where: { id: applicationId } });
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    
    // Upload to storage (implement based on your storage solution)
    const documentUrl = await this.uploadToStorage(file);
    
    const document = this.documentRepo.create({
      nationalIdApplicationId: applicationId,
      documentType: documentType,
      documentName: file.originalname,
      documentUrl,
      score: this.getDocumentScore(documentType),
    });

    const savedDocument = await this.documentRepo.save(document);

    // Recalculate score
    await this.recalculateScore(applicationId);
    
    return savedDocument;
  }

  private getDocumentScore(documentType: string): number {
    const scores: { [key: string]: number } = {
      'BIRTH_CERTIFICATE': 60,
      'PASSPORT': 40,
      'VOTER_CARD': 40,
      'DRIVERS_LICENSE': 30,
      'EMPLOYMENT_ID': 10,
      'MARRIAGE_CERTIFICATE': 10,
      'PAY_SLIP': 30,
      'VILLAGE_HEAD_LETTER': 40,
      'CITIZENSHIP_CERTIFICATE': 60,
    };
    return scores[documentType] || 10;
  }

  async findAll(filters: any) {
    const queryBuilder = this.nationalIdAppRepo.createQueryBuilder('app')
      .leftJoinAndSelect('app.supportingDocuments', 'docs')
      .leftJoinAndSelect('app.verificationLogs', 'logs')
      .orderBy('app.createdAt', 'DESC');

    if (filters.status) {
      queryBuilder.andWhere('app.status = :status', { status: filters.status });
    }
    if (filters.district) {
      queryBuilder.andWhere('app.residentialDistrict = :district', { district: filters.district });
    }
    if (filters.startDate && filters.endDate) {
      queryBuilder.andWhere('app.createdAt BETWEEN :startDate AND :endDate', {
        startDate: filters.startDate,
        endDate: filters.endDate,
      });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string) {
    const application = await this.nationalIdAppRepo.findOne({
      where: { id },
      relations: ['supportingDocuments', 'verificationLogs'],
    });
    
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    
    return application;
  }

  // ✅ FIXED: Query the NationalId repository (for issued IDs)
  async findByNationalIdNumber(nationalIdNumber: string): Promise<NationalId | null> {
    return this.nationalIdRepo.findOne({ 
      where: { nationalIdNumber: nationalIdNumber }
    });
  }

  // ✅ New: Get all issued National IDs
  async findAllIssuedIds(): Promise<NationalId[]> {
    return this.nationalIdRepo.find({
      order: { issuedAt: 'DESC' },
    });
  }

  // ✅ New: Get a single issued National ID
  async findIssuedIdById(id: string): Promise<NationalId | null> {
    return this.nationalIdRepo.findOne({ where: { id } });
  }

  async verifyByVillageHead(applicationId: string, villageHeadIdNo: string, signature: string) {
    const application = await this.findOne(applicationId);
    
    application.villageHeadIdNo = villageHeadIdNo;
    application.villageHeadSignature = signature;
    application.status = ApplicationStatus.VERIFIED;
    
    const updated = await this.nationalIdAppRepo.save(application);
    
    await this.createVerificationLog(applicationId, 'Village Head Verification', `Verified by ID: ${villageHeadIdNo}`);

    return updated;
  }

  // ✅ This method creates a final issued ID after approval
  async issueNationalId(applicationId: string): Promise<NationalId> {
    const application = await this.findOne(applicationId);
    
    if (application.status !== ApplicationStatus.APPROVED && application.status !== ApplicationStatus.VERIFIED) {
      throw new BadRequestException('Application must be approved first');
    }
    
    // Generate unique national ID number
    const nationalIdNumber = this.generateNationalIdNumber();
    
    const newNationalId = this.nationalIdRepo.create({
      nationalIdNumber,
      firstName: application.firstName,
      surname: application.surname,
      dateOfBirth: application.dateOfBirth,
      gender: application.gender,
      placeOfBirth: application.districtOfBirth,
      fatherName: application.fatherFullName,
      motherName: application.motherFullName,
      address: application.residentialVillage,
      isValid: true,
      issuedAt: new Date(),
    });
    
    // Update application status
    application.status = ApplicationStatus.COMPLETED;
    await this.nationalIdAppRepo.save(application);
    
    return this.nationalIdRepo.save(newNationalId);
  }

  private generateNationalIdNumber(): string {
    // Generate a unique national ID number
    // Format: YYMMDD + random 6 digits
    const date = new Date();
    const yy = date.getFullYear().toString().slice(-2);
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return `${yy}${mm}${dd}${random}`;
  }

  async generateReport(startDate: Date, endDate: Date) {
    const applications = await this.nationalIdAppRepo.find({
      where: {
        createdAt: {
          // Using Between operator - handled by filter below
        } as any,
      },
      order: { createdAt: 'ASC' },
    });

    // Filter by date range
    const filtered = applications.filter(app => 
      app.createdAt >= startDate && app.createdAt <= endDate
    );

    // Generate Excel/PDF report
    return this.generateExcelReport(filtered);
  }

  private async createVerificationLog(applicationId: string, action: string, notes: string) {
    const log = this.logRepo.create({
      nationalIdApplicationId: applicationId,
      action,
      notes,
      performedBy: 'SYSTEM',
      performedAt: new Date(),
    });
    
    return this.logRepo.save(log);
  }

  private async recalculateScore(applicationId: string) {
    const documents = await this.documentRepo.find({
      where: { nationalIdApplicationId: applicationId },
    });

    const totalScore = documents.reduce((sum, doc) => sum + (doc.score || 0), 0);
    const isEligible = totalScore >= 100;

    await this.nationalIdAppRepo.update(applicationId, {
      citizenshipScore: totalScore,
      isEligible,
      status: isEligible ? ApplicationStatus.VERIFIED : ApplicationStatus.PENDING,
    });
  }

  private async uploadToStorage(file: Express.Multer.File): Promise<string> {
    // Implement your storage solution (local, S3, etc.)
    // For now, return a placeholder URL
    return `https://your-storage.com/documents/${Date.now()}-${file.originalname}`;
  }

  private async generateExcelReport(data: any[]) {
    // Simple implementation - you can expand this
    const ExcelJS = require('exceljs');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('National ID Applications');
    
    worksheet.columns = [
      { header: 'Application Number', key: 'applicationNumber', width: 20 },
      { header: 'Full Name', key: 'fullName', width: 30 },
      { header: 'Date of Birth', key: 'dateOfBirth', width: 15 },
      { header: 'Gender', key: 'gender', width: 10 },
      { header: 'District', key: 'district', width: 20 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Score', key: 'citizenshipScore', width: 10 },
    ];
    
    data.forEach(app => {
      worksheet.addRow({
        applicationNumber: app.applicationNumber,
        fullName: `${app.firstName} ${app.surname}`,
        dateOfBirth: app.dateOfBirth,
        gender: app.gender,
        district: app.residentialDistrict,
        status: app.status,
        citizenshipScore: app.citizenshipScore,
      });
    });
    
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}