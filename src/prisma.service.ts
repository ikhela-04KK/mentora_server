import { Injectable, OnModuleInit } from '@nestjs/common'; 
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  [x: string]: any;
  async onModuleInit() {//Lance la base de donnée de façon asynchrone avant que le module ne soit prêt à traiter les requêtes 
    await this.$connect();
  }
}
