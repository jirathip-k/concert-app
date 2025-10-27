import { Controller, Post, Delete, Param, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private resService: ReservationService) {}

  @Post(':userId/:concertId')
  reserve(
    @Param('userId') userId: number,
    @Param('concertId') concertId: number,
  ) {
    return this.resService.reserve(userId, concertId);
  }

  @Delete(':userId/:concertId')
  cancel(
    @Param('userId') userId: number,
    @Param('concertId') concertId: number,
  ) {
    return this.resService.cancel(userId, concertId);
  }

  @Get('user/:userId')
  userHistory(@Param('userId') userId: number) {
    return this.resService.findUserHistory(userId);
  }

  @Get('admin/history')
  adminHistory() {
    return this.resService.findAllHistory();
  }
}
