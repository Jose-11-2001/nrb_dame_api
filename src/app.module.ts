// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
    NationalIdModule,
    DeathModule,         
    VerificationModule,  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}