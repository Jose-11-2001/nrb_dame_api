import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NationalIdModule } from './nationa_id/national_id.module';
import { DeathModule } from './death/death.module';
import { VerificationModule } from './verification/verification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // ✅ Database configuration
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || process.env.POSTGRES_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    // ✅ Your feature modules
    NationalIdModule,
    DeathModule,
    VerificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}