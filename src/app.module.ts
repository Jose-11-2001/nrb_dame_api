//remote dbconnection
/*import { Module } from '@nestjs/common';
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
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || process.env.POSTGRES_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    NationalIdModule,
    DeathModule,
    VerificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
*/

// local db connection for testing and development
// src/app.module.ts - Local database version (currently active)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NationalIdModule } from './nationa_id/national_id.module';
//import { DeathModule } from '../death/death.module';
import { VerificationModule } from './verification/verification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2001',
      database: 'nrbdb',  // Note: Your database name is 'nrbdb'
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    NationalIdModule,
    //DeathModule,
    VerificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}