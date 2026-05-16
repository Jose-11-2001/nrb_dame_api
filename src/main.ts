import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

let cachedServer: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable validation pipes
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  
  // Enable CORS
  app.enableCors();
  
  // Global prefix
  app.setGlobalPrefix('api');
  
  // For local development
  if (process.env.NODE_ENV !== 'production') {
    await app.listen(process.env.PORT || 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  }
  
  return app;
}

// For Vercel serverless environment
if (process.env.VERCEL) {
  module.exports = async (req: any, res: any) => {
    if (!cachedServer) {
      const app = await bootstrap();
      cachedServer = app.getHttpAdapter().getInstance();
    }
    cachedServer(req, res);
  };
}

// For local development
if (require.main === module) {
  bootstrap();
}