import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NationalIdModule } from './nationa_id/national_id.module';
import { DeathModule } from './death/death.module';
import { VerificationModule } from './verification/verification.module';
import { NationalIdApplication } from './nationa_id/entities/nationalIdApplication.entity';
import { SupportingDocument } from './nationa_id/entities/supporting-document.entity';
import { VerificationLog } from './nationa_id/entities/verification-log.entity';
import { NationalId } from './nationa_id/entities/national-id.entity';
import { DeathCertificate } from './death/entities/death-certificate.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // ✅ Add TypeORM configuration
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Vercel Postgres URL
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
      ssl: {
        rejectUnauthorized: false, // Required for Vercel Postgres
      },
    }),
    TypeOrmModule.forFeature([
      NationalIdApplication,
      SupportingDocument,
      VerificationLog,
      NationalId,
      DeathCertificate,
    ]),
    NationalIdModule,
    DeathModule,
    VerificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}