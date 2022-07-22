/*import { Test, TestingModule } from '@nestjs/testing';
import {PointInteretDto } from './dto/pointinteret.dto';
import { PointInteretsController } from './pointinterets.controller';
import { PointInteretsService } from './pointinterets.service';

const createpointInteretDto: PointInteretDto = {
    id: 1,
    nom: 'test',
    description: 'test',
    latitude: 1,
    longitude: 1,
    type: 'test',
};

describe('PointInteretController', () => {
  let PointInteretController: PointInteretsController;
  let PointInteretService: PointInteretsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PointInteretController],
      providers: [
        PointInteretService,
        {
          provide: PointInteretService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((createpointInteretDto: PointInteretDto) =>
                Promise.resolve({ id: '1', ...createpointInteretDto }),
              ),
          },
        },
      ],
    }).compile();

    PointInteretController = app.get<PointInteretController>(PointInteretController);
    PointInteretService = app.get<PointInteretService>(PointInteretService);
  });

  it('should be defined', () => {
    expect(PointInteretController).toBeDefined();
  });*/
