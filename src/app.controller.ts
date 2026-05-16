import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Controller()
export class AppController {
  constructor(private databaseService: DatabaseService) {}

  @Get('test-db')
  async testDatabase() {
    const result = await this.databaseService.client`SELECT NOW()`;
    return { 
      success: true, 
      time: result[0].now,
      message: 'Database connected! 🎉'
    };
  }

  @Get('comments')
  async getComments() {
    return await this.databaseService.client`
      SELECT * FROM comments ORDER BY created_at DESC
    `;
  }
}