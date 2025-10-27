import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './concert.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Concerts')
@Controller('concerts')
export class ConcertController {
  constructor(private concertService: ConcertService) {}

  @Get()
  getAll() {
    return this.concertService.findAll();
  }

  @Post()
  create(@Body() body: CreateConcertDto) {
    return this.concertService.create(body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.concertService.delete(id);
  }
}
