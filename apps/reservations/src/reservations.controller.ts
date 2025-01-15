import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { FilterQuery } from 'mongoose';
import { ReservationDocument } from './reservations.model';
import { UpdateReservationDto } from './dtos/update-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}
  @Post('')
  post(@Body() data: CreateReservationDto) {
    return this.reservationsService.createReservations(data);
  }

  @Get('')
  get(@Query() filters: FilterQuery<ReservationDocument>) {
    return this.reservationsService.listReservations(filters);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.reservationsService.getReservation(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateReservationDto) {
    return this.reservationsService.updateReservation(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reservationsService.deleteReservation(id);
  }
}
