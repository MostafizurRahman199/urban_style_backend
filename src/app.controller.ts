import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  getHello() {
    return {
      status: 'success',
      message: 'Urban Style E-Commerce API is running smoothly!',
      documentation: '/api/docs',
    };
  }
}
