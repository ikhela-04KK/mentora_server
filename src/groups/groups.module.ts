import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsGateway } from './groups.gateway';

@Module({
  providers: [GroupsGateway, GroupsService],
})
export class GroupsModule {}
