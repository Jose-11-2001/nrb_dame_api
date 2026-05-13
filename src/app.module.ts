// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './database/typeorm.config';
import { NationalIdModule } from './nationa_id/national_id.module';
import { DeathModule } from './death/death.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', '2001'),
        database: configService.get('DB_DATABASE', 'nrbdb'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('DB_SYNC', true),
        logging: configService.get('DB_LOGGING', true),
      }),
      inject: [ConfigService],
    }),
    NationalIdModule,
    DeathModule,
  ],
})
export class AppModule {}