import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

let cachedServer: any;

export default async function handler(req: any, res: any) {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ 
      whitelist: true, 
      transform: true 
    }));
    await app.init();
    cachedServer = app.getHttpAdapter().getInstance();
  }
  cachedServer(req, res);
}