import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepo } from '@app/common/database/abstract.repository';
import { ReservationDocument } from './reservations.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReservationRepository extends AbstractRepo<ReservationDocument> {
  protected readonly logger = new Logger(ReservationRepository.name);

  constructor(
    @InjectModel(ReservationDocument.name) model: Model<ReservationDocument>,
  ) {
    super(model);
  }
}
