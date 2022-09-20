import { Test, TestingModule } from '@nestjs/testing';
import { RobotsController } from './robot.controller';
import { RobotsService } from './robot.service';

describe('RobotsController', () => {
    let controller: RobotsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RobotsController],
            providers: [RobotsService],
        }).compile();

        controller = module.get<RobotsController>(RobotsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
