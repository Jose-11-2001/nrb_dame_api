// src/database/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NationalIdApplication } from '../nationa_id/entities/national_id.entity';
import { SupportingDocument } from '../nationa_id/entities/supporting-document.entity';
import { VerificationLog } from '../nationa_id/entities/verification-log.entity';
import { DeathCertificate } from '../death/entities/death-certificate.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'nrbdb',
  entities: [
    NationalIdApplication,
    SupportingDocument,
    VerificationLog,
    DeathCertificate,
  ],
  synchronize: true, // Set to false in production
  logging: true,
};