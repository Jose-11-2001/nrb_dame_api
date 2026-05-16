import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  @Get()
  root(@Req() req: Request, @Res() res: Response) {
    return res.json({
      message: 'NestJS API is running on Vercel!',
      status: 'online',
      timestamp: new Date().toISOString(),
      path: req.url
    });
  }

  @Get('health')
  health(@Res() res: Response) {
    return res.json({
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  }
}