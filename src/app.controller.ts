import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root() {
    return { 
      message: 'NestJS API is running on Vercel!',
      status: 'online',
      timestamp: new Date().toISOString()
    };
  }

  @Get('health')
  health() {
    return { 
      status: 'ok', 
      timestamp: new Date().toISOString() 
    };
  }
}