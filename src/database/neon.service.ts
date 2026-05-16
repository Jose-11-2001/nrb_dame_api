import { Injectable, OnModuleInit } from '@nestjs/common';
import { neon, NeonQueryFunction } from '@neondatabase/serverless';

@Injectable()
export class NeonService implements OnModuleInit {
  private sql: NeonQueryFunction<any, any>;

  async onModuleInit() {
    // Initialize the connection
    this.sql = neon(process.env.DATABASE_URL!);
    
    // Test the connection
    const result = await this.sql`SELECT NOW()`;
    console.log('✅ Neon database connected:', result[0]);
  }

  get client() {
    return this.sql;
  }

  async query(text: string, params?: any[]) {
    return this.sql(text, params);
  }
}