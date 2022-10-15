import { Test, TestingModule } from '@nestjs/testing';
import { UserRobotsService } from './user-robots.service';

describe('UserRobotsService', () => {
    let service: UserRobotsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserRobotsService],
        }).compile();

        service = module.get<UserRobotsService>(UserRobotsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
