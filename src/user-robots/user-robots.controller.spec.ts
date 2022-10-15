import { Test, TestingModule } from '@nestjs/testing';
import { UserRobotsController } from './user-robots.controller';
import { UserRobotsService } from './user-robots.service';

describe('UserRobotsController', () => {
    let controller: UserRobotsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserRobotsController],
            providers: [UserRobotsService],
        }).compile();

        controller = module.get<UserRobotsController>(UserRobotsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
