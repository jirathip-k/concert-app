import { Test, TestingModule } from '@nestjs/testing';
import { ConcertService } from './concert.service';
import { Concert } from './concert.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

describe('ConcertService', () => {
  let service: ConcertService;
  let concertRepository: Repository<Concert>;

  // Mock data
  const mockConcert = {
    id: 1,
    name: 'Concert 1',
    deletedAt: null,
  };

  const mockDeletedConcert = {
    id: 2,
    name: 'Concert 2',
    deletedAt: new Date(),
  };

  const mockConcertRepository = {
    find: jest.fn().mockResolvedValue([mockConcert]),
    findOne: jest.fn().mockResolvedValue(mockConcert),
    create: jest.fn().mockReturnValue(mockConcert),
    save: jest.fn().mockResolvedValue(mockConcert),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcertService,
        {
          provide: getRepositoryToken(Concert),
          useValue: mockConcertRepository,
        },
      ],
    }).compile();

    service = module.get<ConcertService>(ConcertService);
    concertRepository = module.get<Repository<Concert>>(
      getRepositoryToken(Concert),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all concerts that are not soft-deleted', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockConcert]);
      expect(concertRepository.find).toHaveBeenCalledWith({
        where: { deletedAt: null },
        relations: ['reservations'],
      });
    });
  });

  describe('create', () => {
    it('should create and save a concert', async () => {
      const createConcertDto = { name: 'New Concert' };
      const result = await service.create(createConcertDto);
      expect(result).toEqual(mockConcert);
      expect(concertRepository.create).toHaveBeenCalledWith(createConcertDto);
      expect(concertRepository.save).toHaveBeenCalledWith(mockConcert);
    });
  });

  describe('delete', () => {
    it('should throw an error if the concert does not exist', async () => {
      concertRepository.findOne = jest.fn().mockResolvedValue(null);
      await expect(service.delete(999)).rejects.toThrowError(
        'Concert not found',
      );
    });

    it('should throw a BadRequestException if the concert is already deleted', async () => {
      concertRepository.findOne = jest
        .fn()
        .mockResolvedValue(mockDeletedConcert);
      await expect(service.delete(2)).rejects.toThrowError(BadRequestException);
    });

    it('should delete a concert and set deletedAt', async () => {
      const concertToDelete = { ...mockConcert, deletedAt: null };
      concertRepository.findOne = jest.fn().mockResolvedValue(concertToDelete);

      const result = await service.delete(1);

      expect(result).toEqual({ ...mockConcert, deletedAt: expect.any(Date) });
      expect(concertRepository.save).toHaveBeenCalledWith({
        ...mockConcert,
        deletedAt: expect.any(Date),
      });
    });
  });
});
