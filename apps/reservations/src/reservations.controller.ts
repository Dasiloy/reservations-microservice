import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { FilterQuery } from 'mongoose';
import { ReservationDocument } from './reservations.model';
import { UpdateReservationDto } from './dtos/update-reservation.dto';
import { AuthGuard, CurrentUser } from '@app/common';
import { UserDocument } from 'apps/auth/src/users/user.model';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(AuthGuard)
  @Post('')
  post(@Body() data: CreateReservationDto, @CurrentUser() user: UserDocument) {
    return this.reservationsService.createReservations(data, user);
  }

  @UseGuards(AuthGuard)
  @Get('')
  get(
    @Query() filters: FilterQuery<ReservationDocument>,
    @CurrentUser() user: UserDocument,
  ) {
    return this.reservationsService.listReservations({
      user,
      ...filters,
    });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.reservationsService.getReservation(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateReservationDto) {
    return this.reservationsService.updateReservation(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reservationsService.deleteReservation(id);
  }
}
