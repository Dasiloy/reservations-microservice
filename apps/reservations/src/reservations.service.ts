import { Injectable } from '@nestjs/common';
import { ReservationRepository } from './reservations.repository';
import { FilterQuery } from 'mongoose';
import { ReservationDocument } from './reservations.model';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { UpdateReservationDto } from './dtos/update-reservation.dto';
import { UserDocument } from 'apps/auth/src/users/user.model';

@Injectable()
export class ReservationsService {
  constructor(private readonly repo: ReservationRepository) {}

  createReservations(
    data: CreateReservationDto,
    user: UserDocument,
  ): Promise<ReservationDocument> {
    return this.repo.create({
      ...data,
      user,
    });
  }

  listReservations(filters: FilterQuery<ReservationDocument>) {
    return this.repo.find(filters);
  }

  getReservation(_id: string) {
    return this.repo.findOne({ _id });
  }

  updateReservation(_id: string, data: UpdateReservationDto) {
    return this.repo.findOneAndUpdate(
      { _id },
      {
        $set: data,
      },
    );
  }

  deleteReservation(_id: string) {
    return this.repo.findOneAndDelete({ _id });
  }
}
