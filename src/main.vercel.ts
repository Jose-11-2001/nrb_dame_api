import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let app: any;

export default async function handler(req: any, res: any) {
  try {
    if (!app) {
      console.log('Initializing NestJS app...');
      app = await NestFactory.create(AppModule);
      app.enableCors();
      await app.init();
      console.log('NestJS app initialized successfully');
    }
    
    const expressApp = app.getHttpAdapter().getInstance();
    expressApp(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: error.message 
    });
  }
}