import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NationalIdApplication, ApplicationStatus } from './entities/nationalIdApplication.entity';
import { NationalId } from './entities/national-id.entity';
import { SupportingDocument } from './entities/supporting-document.entity';
import { VerificationLog } from './entities/verification-log.entity';
import { CreateNationalIdDto } from './dto/create-national_id.dto';

@Injectable()
export class NationalIdService {
  constructor(
    @InjectRepository(NationalIdApplication)
    private nationalIdAppRepo: Repository<NationalIdApplication>,
    
    @InjectRepository(NationalId)
    private nationalIdRepo: Repository<NationalId>,
    
    @InjectRepository(SupportingDocument)
    private documentRepo: Repository<SupportingDocument>,
    
    @InjectRepository(VerificationLog)
    private logRepo: Repository<VerificationLog>,
  ) {}

  private calculateCitizenshipScore(dto: CreateNationalIdDto): number {
    let score = 0;
    if (dto.motherIdNo || dto.fatherIdNo) {
      score += 100;
    }
    if (dto.firstWitnessIdNo && dto.secondWitnessIdNo) {
      score += 100;
    }
    return score;
  }

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
    const applicationNumber = `NR1/${new Date().getFullYear()}/${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
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
    const application = await this.nationalIdAppRepo.findOne({ where: { id: applicationId } });
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    
    const documentUrl = await this.uploadToStorage(file);
    
    const document = this.documentRepo.create({
      nationalIdApplicationId: applicationId,
      documentType: documentType,
      documentName: file.originalname,
      documentUrl,
      score: this.getDocumentScore(documentType),
    });

    const savedDocument = await this.documentRepo.save(document);
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

  async findByNationalIdNumber(nationalIdNumber: string): Promise<NationalId | null> {
    return this.nationalIdRepo.findOne({ 
      where: { nationalIdNumber: nationalIdNumber }
    });
  }

  async findAllIssuedIds(): Promise<NationalId[]> {
    return this.nationalIdRepo.find({
      order: { issuedAt: 'DESC' },
    });
  }

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

  async findBySurname(surname: string): Promise<NationalId[]> {
    return this.nationalIdRepo.find({
      where: { 
        surname: surname,
        isValid: true 
      },
      order: { issuedAt: 'DESC' },
    });
  }

  async getStatistics() {
    const total = await this.nationalIdRepo.count();
    const valid = await this.nationalIdRepo.count({ where: { isValid: true } });
    const deceased = await this.nationalIdRepo.count({ where: { isDeceased: true } });
    const pending = await this.nationalIdAppRepo.count({ 
      where: { status: ApplicationStatus.PENDING } 
    });
    
    return {
      total,
      valid,
      deceased,
      active: total - deceased,
      pendingApplications: pending,
    };
  }

  async getRecentIssued(limit: number = 10): Promise<NationalId[]> {
    return this.nationalIdRepo.find({
      order: { issuedAt: 'DESC' },
      take: limit,
    });
  }

  async getPendingCount(): Promise<number> {
    return this.nationalIdAppRepo.count({
      where: { status: ApplicationStatus.PENDING }
    });
  }

  private generateAlphanumeric(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private async generateUniqueNationalIdNumber(): Promise<string> {
    let attempts = 0;
    const maxAttempts = 10;
    
    while (attempts < maxAttempts) {
      const candidateId = this.generateAlphanumeric(8);
      const existingId = await this.nationalIdRepo.findOne({
        where: { nationalIdNumber: candidateId }
      });
      
      if (!existingId) {
        return candidateId;
      }
      
      if (existingId.isDeceased) {
        console.log(`ID ${candidateId} belongs to deceased person, generating new one...`);
        attempts++;
        continue;
      }
      attempts++;
    }
    
    throw new BadRequestException('Unable to generate unique National ID. Please try again.');
  }

  async issueNationalId(applicationId: string): Promise<NationalId> {
    const application = await this.findOne(applicationId);
    
    if (application.status !== ApplicationStatus.APPROVED && application.status !== ApplicationStatus.VERIFIED) {
      throw new BadRequestException('Application must be approved first');
    }
    
    const nationalIdNumber = await this.generateUniqueNationalIdNumber();
    
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
    
    application.status = ApplicationStatus.COMPLETED;
    await this.nationalIdAppRepo.save(application);
    
    return this.nationalIdRepo.save(newNationalId);
  }

  async generateReport(startDate: Date, endDate: Date) {
    const applications = await this.nationalIdAppRepo.find({
      order: { createdAt: 'ASC' },
    });

    const filtered = applications.filter(app => 
      app.createdAt >= startDate && app.createdAt <= endDate
    );

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
    return `https://your-storage.com/documents/${Date.now()}-${file.originalname}`;
  }

  private async generateExcelReport(data: any[]) {
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

  async approveApplication(id: string, approvedBy: string): Promise<NationalIdApplication> {
    const application = await this.findOne(id);
    
    if (application.status !== 'VERIFIED') {
      throw new BadRequestException('Application must be verified before approval');
    }
    
    const nationalIdNumber = await this.generateUniqueNationalIdNumber();
    
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
    
    await this.nationalIdRepo.save(newNationalId);
    
    application.status = 'APPROVED';
    application.rejectionReason = null;
    await this.nationalIdAppRepo.save(application);
    
    await this.createVerificationLog(id, 'Application Approved', `Approved by: ${approvedBy}. ID Number: ${nationalIdNumber}`);
    
    return application;
  }

  async rejectApplication(id: string, reason: string, rejectedBy: string): Promise<NationalIdApplication> {
    const application = await this.findOne(id);
    
    if (application.status !== 'PENDING' && application.status !== 'VERIFIED') {
      throw new BadRequestException('Only pending or verified applications can be rejected');
    }
    
    application.status = 'REJECTED';
    application.rejectionReason = reason;
    await this.nationalIdAppRepo.save(application);
    
    await this.createVerificationLog(id, 'Application Rejected', `Rejected by: ${rejectedBy}. Reason: ${reason}`);
    
    return application;
  }

  async findByApplicationId(applicationId: string): Promise<NationalId | null> {
    const application = await this.findOne(applicationId);
    if (!application) return null;
    
    return this.nationalIdRepo.findOne({ 
      where: {
        firstName: application.firstName,
        surname: application.surname,
        dateOfBirth: application.dateOfBirth,
      }
    });
  }

  async getAllApplicationsForAdmin(): Promise<NationalIdApplication[]> {
    return this.nationalIdAppRepo.find({
      relations: ['supportingDocuments', 'verificationLogs'],
      order: { createdAt: 'DESC' },
    });
  }

  // ============ NEW ID VERIFICATION METHODS ============

  async checkIdExists(nationalIdNumber: string): Promise<{
    exists: boolean;
    isValid: boolean;
    isDeceased: boolean;
    message: string;
    data?: {
      fullName: string;
      surname: string;
      firstName: string;
      dateOfBirth: Date;
      nationality: string;
      district?: string;
      village?: string;
      gender?: string;
      placeOfBirth?: string;
    };
  }> {
    const nationalId = await this.nationalIdRepo.findOne({
      where: { nationalIdNumber, isValid: true },
    });

    if (nationalId) {
      return {
        exists: true,
        isValid: true,
        isDeceased: nationalId.isDeceased || false,
        message: 'National ID exists and is valid',
        data: {
          fullName: `${nationalId.firstName} ${nationalId.surname}`,
          surname: nationalId.surname,
          firstName: nationalId.firstName,
          dateOfBirth: nationalId.dateOfBirth,
          nationality: (nationalId as any).nationality || 'Malawian',
          district: (nationalId as any).district,
          village: (nationalId as any).address || (nationalId as any).village,
          gender: nationalId.gender,
          placeOfBirth: (nationalId as any).placeOfBirth,
        },
      };
    }

    const invalidId = await this.nationalIdRepo.findOne({
      where: { nationalIdNumber, isValid: false },
    });

    if (invalidId) {
      return {
        exists: true,
        isValid: false,
        isDeceased: invalidId.isDeceased || false,
        message: 'National ID exists but is invalid (revoked or expired)',
        data: {
          fullName: `${invalidId.firstName} ${invalidId.surname}`,
          surname: invalidId.surname,
          firstName: invalidId.firstName,
          dateOfBirth: invalidId.dateOfBirth,
          nationality: (invalidId as any).nationality || 'Malawian',
          district: (invalidId as any).district,
          village: (invalidId as any).address || (invalidId as any).village,
          gender: invalidId.gender,
          placeOfBirth: (invalidId as any).placeOfBirth,
        },
      };
    }

    const existingApplication = await this.nationalIdAppRepo.findOne({
      where: [
        { applicationNumber: nationalIdNumber },
      ],
    });

    if (existingApplication && existingApplication.status === 'APPROVED') {
      return {
        exists: true,
        isValid: true,
        isDeceased: false,
        message: 'Application approved, National ID will be issued soon',
        data: {
          fullName: `${existingApplication.firstName} ${existingApplication.surname}`,
          surname: existingApplication.surname,
          firstName: existingApplication.firstName,
          dateOfBirth: existingApplication.dateOfBirth,
          nationality: 'Malawian',
          district: existingApplication.residentialDistrict,
          village: existingApplication.residentialVillage,
          gender: existingApplication.gender,
          placeOfBirth: existingApplication.districtOfBirth,
        },
      };
    }

    return {
      exists: false,
      isValid: false,
      isDeceased: false,
      message: 'National ID number not found in the system',
    };
  }

  async checkMultipleIdsExist(nationalIdNumbers: string[]): Promise<{
    results: Array<{
      nationalIdNumber: string;
      exists: boolean;
      isValid: boolean;
      isDeceased: boolean;
      fullName: string | null;
      message: string;
      details?: any;
    }>;
    total: number;
    found: number;
    notFound: number;
  }> {
    const results = await Promise.all(
      nationalIdNumbers.map(async (idNumber) => {
        const result = await this.checkIdExists(idNumber);
        return {
          nationalIdNumber: idNumber,
          exists: result.exists,
          isValid: result.isValid,
          isDeceased: result.isDeceased,
          fullName: result.data?.fullName || null,
          message: result.message,
          details: result.data || null,
        };
      })
    );

    const found = results.filter(r => r.exists).length;
    const notFound = results.filter(r => !r.exists).length;

    return {
      results,
      total: results.length,
      found,
      notFound,
    };
  }

  async searchByPartialId(partialNumber: string): Promise<NationalId[]> {
    return this.nationalIdRepo
      .createQueryBuilder('id')
      .where('id.nationalIdNumber ILIKE :partial', { partial: `%${partialNumber}%` })
      .andWhere('id.isValid = :isValid', { isValid: true })
      .orderBy('id.nationalIdNumber', 'ASC')
      .take(20)
      .getMany();
  }

  async getIdDetails(nationalIdNumber: string): Promise<NationalId | null> {
    return this.nationalIdRepo.findOne({
      where: { nationalIdNumber, isValid: true },
    });
  }

  async checkIfDeceased(nationalIdNumber: string): Promise<{
    isDeceased: boolean;
    dateOfDeath?: Date;
    deathCertificateNumber?: string;
    message: string;
  }> {
    const nationalId = await this.nationalIdRepo.findOne({
      where: { nationalIdNumber },
    });

    if (!nationalId) {
      return {
        isDeceased: false,
        message: 'National ID not found in the system',
      };
    }

    if (nationalId.isDeceased) {
      return {
        isDeceased: true,
        dateOfDeath: (nationalId as any).dateOfDeath,
        deathCertificateNumber: (nationalId as any).deathCertificateNumber,
        message: 'This person is recorded as deceased',
      };
    }

    return {
      isDeceased: false,
      message: 'This person is alive',
    };
  }
}