import { Injectable, OnModuleInit } from '@nestjs/common';
import { neon } from '@neondatabase/serverless';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private sql: any;

  async onModuleInit() {
    this.sql = neon(process.env.POSTGRES_URL!);
    // Test connection
    const result = await this.sql`SELECT NOW()`;
    console.log('✅ Database connected:', result[0]);
  }

  get client() {
    return this.sql;
  }

  async query(text: string, params?: any[]) {
    return this.sql(text, params);
  }
}