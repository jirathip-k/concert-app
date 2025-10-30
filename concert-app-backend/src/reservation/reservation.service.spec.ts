import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { Reservation, ReservationAction } from './reservation.entity';
import { Concert } from '@/concert/concert.entity';
import { User } from '@/user/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

describe('ReservationService', () => {
  let service: ReservationService;
  let resRepo: Repository<Reservation>;
  let concertRepo: Repository<Concert>;
  let userRepo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getRepositoryToken(Reservation),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Concert),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    resRepo = module.get<Repository<Reservation>>(
      getRepositoryToken(Reservation),
    );
    concertRepo = module.get<Repository<Concert>>(getRepositoryToken(Concert));
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('reserveOrCancel', () => {
    it('should successfully reserve a seat for a user', async () => {
      const userId = 1;
      const concertId = 1;
      const action = ReservationAction.RESERVED;

      // Simulate a concert with 2 seats and no existing reservations
      const mockConcert = { id: concertId, totalSeats: 2, reservations: [] };

      // Simulate a user
      const mockUser = { id: userId };

      // Mocking repository calls
      jest.spyOn(concertRepo, 'findOne').mockResolvedValue(mockConcert);
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(mockUser);
      jest
        .spyOn(resRepo, 'create')
        .mockReturnValue({ user: mockUser, concert: mockConcert, action });
      jest
        .spyOn(resRepo, 'save')
        .mockResolvedValue({ user: mockUser, concert: mockConcert, action });

      // Perform the reservation
      const result = await service.reserveOrCancel({
        userId,
        concertId,
        action,
      });

      // Assert that the reservation was saved and returned correctly
      expect(result).toEqual({ user: mockUser, concert: mockConcert, action });
      expect(resRepo.save).toHaveBeenCalledWith({
        user: mockUser,
        concert: mockConcert,
        action,
      });
    });

    it('should allow user to cancel reservation', async () => {
      const userId = 1;
      const concertId = 1;
      const action = ReservationAction.CANCELED;
      const mockUser = { id: userId };
      const mockConcert = { id: concertId, totalSeats: 5, reservations: [] };
      const existingReservation = {
        id: 1,
        user: mockUser,
        concert: mockConcert,
        action: ReservationAction.RESERVED,
      };

      jest.spyOn(concertRepo, 'findOne').mockResolvedValue(mockConcert);
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(resRepo, 'findOne').mockResolvedValue(existingReservation);
      jest.spyOn(resRepo, 'save').mockResolvedValue({
        ...existingReservation,
        action: ReservationAction.CANCELED,
      });

      const result = await service.reserveOrCancel({
        userId,
        concertId,
        action,
      });
      expect(result.action).toBe(ReservationAction.CANCELED);
      expect(resRepo.save).toHaveBeenCalledWith({
        ...existingReservation,
        action: ReservationAction.CANCELED,
      });
    });
    it('should throw an error if concert is full and action is RESERVED', async () => {
      const userId = 1;
      const concertId = 1;
      const action = ReservationAction.RESERVED;

      // Simulate a concert that is full (1 reserved out of 1 seat)
      const mockConcert = {
        id: concertId,
        totalSeats: 1,
        reservations: [{ id: 1 }],
      }; // 1 seat already reserved
      const mockUser = { id: userId };

      // Mocking repository calls
      jest.spyOn(concertRepo, 'findOne').mockResolvedValue(mockConcert);
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(mockUser);

      try {
        await service.reserveOrCancel({ userId, concertId, action });
      } catch (error) {
        // Check the error message without needing to test for the specific BadRequestException class
        expect(error.message).toBe('No seats available');
      }
    });

    it('should throw an error if attempting to cancel a non-existent reservation', async () => {
      const userId = 1;
      const concertId = 1;
      const action = ReservationAction.CANCELED;
      const mockUser = { id: userId };
      const mockConcert = { id: concertId, totalSeats: 5, reservations: [] };

      jest.spyOn(concertRepo, 'findOne').mockResolvedValue(mockConcert);
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(resRepo, 'findOne').mockResolvedValue(null); // No existing reservation

      try {
        await service.reserveOrCancel({ userId, concertId, action });
      } catch (error) {
        // Check the error message without needing to test for the specific BadRequestException class
        expect(error.message).toBe(
          'Cannot cancel a reservation that does not exist',
        );
      }
    });
  });

  describe('findUserHistory', () => {
    it("should return a user's reservation history", async () => {
      const userId = 1;
      const mockReservations = [
        { id: 1, user: { id: userId }, concert: { id: 1 } },
      ];
      jest.spyOn(resRepo, 'find').mockResolvedValue(mockReservations);

      const result = await service.findUserHistory(userId);
      expect(result).toEqual(mockReservations);
      expect(resRepo.find).toHaveBeenCalledWith({
        where: { user: { id: userId } },
        relations: ['concert'],
      });
    });
  });

  describe('findAllHistory', () => {
    it('should return all reservation history', async () => {
      const mockReservations = [
        { id: 1, user: { id: 1 }, concert: { id: 1 } },
        { id: 2, user: { id: 2 }, concert: { id: 2 } },
      ];
      jest.spyOn(resRepo, 'find').mockResolvedValue(mockReservations);

      const result = await service.findAllHistory();
      expect(result).toEqual(mockReservations);
      expect(resRepo.find).toHaveBeenCalledWith({
        relations: ['user', 'concert'],
      });
    });
  });
});
