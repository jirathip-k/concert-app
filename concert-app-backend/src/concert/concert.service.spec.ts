import { Test, TestingModule } from '@nestjs/testing';
import { ConcertService } from './concert.service';
import { Concert } from './concert.entity';
import { Repository, IsNull } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

describe('ConcertService', () => {
  let service: ConcertService;
  let concertRepo: Repository<Concert>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcertService,
        {
          provide: getRepositoryToken(Concert),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ConcertService>(ConcertService);
    concertRepo = module.get<Repository<Concert>>(getRepositoryToken(Concert));
  });

  // Test case for findAll
  describe('findAll', () => {
    it('should return all concerts without deleted ones', async () => {
      const mockConcerts = [
        { id: 1, name: 'Concert 1' },
        { id: 2, name: 'Concert 2' },
      ];
      jest.spyOn(concertRepo, 'find').mockResolvedValue(mockConcerts);

      const result = await service.findAll();
      expect(result).toEqual(mockConcerts);
      expect(concertRepo.find).toHaveBeenCalledWith({
        where: { deletedAt: IsNull() },
        relations: ['reservations'],
      });
    });
  });

  // Test case for create
  describe('create', () => {
    it('should create and return a concert', async () => {
      const createData = { name: 'New Concert' };
      const mockConcert = { ...createData, id: 1 };

      jest.spyOn(concertRepo, 'create').mockReturnValue(mockConcert);
      jest.spyOn(concertRepo, 'save').mockResolvedValue(mockConcert);

      const result = await service.create(createData);
      expect(result).toEqual(mockConcert);
      expect(concertRepo.create).toHaveBeenCalledWith(createData);
      expect(concertRepo.save).toHaveBeenCalledWith(mockConcert);
    });
  });

  // Test case for delete
  describe('delete', () => {
    it('should delete a concert successfully', async () => {
      const mockConcert = { id: 1, deletedAt: null };
      jest.spyOn(concertRepo, 'findOne').mockResolvedValue(mockConcert);
      jest
        .spyOn(concertRepo, 'save')
        .mockResolvedValue({ ...mockConcert, deletedAt: new Date() });

      const result = await service.delete(1);
      expect(result.deletedAt).toBeDefined();
      expect(concertRepo.save).toHaveBeenCalledWith({
        ...mockConcert,
        deletedAt: expect.any(Date),
      });
    });
  });
});
