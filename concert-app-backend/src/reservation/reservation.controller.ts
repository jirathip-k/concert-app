import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ReservationService } from '@/reservation/reservation.service';
import { ReservationAction } from '@/reservation/reservation.entity';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private resService: ReservationService) {}

  @Post()
  @ApiOperation({ summary: 'Reserve or cancel a concert reservation' })
  @ApiResponse({
    status: 200,
    description: 'Successfully reserved or canceled',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({
    description:
      'Request body for reserving or canceling a concert reservation',
    type: Object,
    examples: {
      reserve: {
        summary: 'Reserve a concert',
        value: {
          userId: 1,
          concertId: 101,
          action: ReservationAction.RESERVED,
        },
      },
      cancel: {
        summary: 'Cancel a reservation',
        value: {
          userId: 1,
          concertId: 101,
          action: ReservationAction.CANCELED,
        },
      },
    },
  })
  async reserveOrCancel(
    @Body()
    data: {
      userId: number;
      concertId: number;
      action: ReservationAction;
    },
  ) {
    return this.resService.reserveOrCancel(data);
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
