import { Test, TestingModule } from '@nestjs/testing';
import { GroupsGateway } from './groups.gateway';
import { GroupsService } from './groups.service';

describe('GroupsGateway', () => {
  let gateway: GroupsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupsGateway, GroupsService],
    }).compile();

    gateway = module.get<GroupsGateway>(GroupsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
