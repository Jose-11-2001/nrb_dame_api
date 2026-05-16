import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { neon } from '@neondatabase/serverless';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-db')
  async testDatabase() {
    try {
      const sql = neon(process.env.DATABASE_URL!);
      const result = await sql`SELECT NOW() as current_time, version() as pg_version`;
      return {
        success: true,
        message: '✅ Database connected successfully!',
        currentTime: result[0].current_time,
        postgresVersion: result[0].pg_version,
        database: 'Neon PostgreSQL'
      };
    } catch (error) {
      return {
        success: false,
        message: '❌ Database connection failed',
        error: error.message
      };
    }
  }

  @Get('comments')
  async getComments() {
    const sql = neon(process.env.DATABASE_URL!);
    const comments = await sql`SELECT * FROM comments ORDER BY created_at DESC`;
    return comments;
  }

  @Get('create-comments-table')
  async createTable() {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        comment TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    return { message: '✅ Comments table created successfully!' };
  }
}