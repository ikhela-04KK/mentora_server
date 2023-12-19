import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // ça doit te permettre de faire un findAll  sauf moi
  // je dois gerer ça côté backend ou côté front end
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
