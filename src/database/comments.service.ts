import { Injectable, OnModuleInit } from '@nestjs/common';
import { neon } from '@neondatabase/serverless';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private sql: any;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const databaseUrl = this.configService.get<string>('POSTGRES_URL');
    if (!databaseUrl) {
      console.error('POSTGRES_URL environment variable is not set');
      return;
    }
    this.sql = neon(databaseUrl);
    
    try {
      const result = await this.sql`SELECT NOW()`;
      console.log('✅ Database connected successfully:', result[0]);
    } catch (error) {
      console.error('❌ Database connection failed:', error);
    }
  }

  get client() {
    if (!this.sql) {
      throw new Error('Database not initialized. Check POSTGRES_URL environment variable.');
    }
    return this.sql;
  }

  async query(text: string, params?: any[]) {
    return this.sql(text, params);
  }
}