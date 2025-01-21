import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepo } from '@app/common/database/abstract.repository';
import { UserDocument } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends AbstractRepo<UserDocument> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(@InjectModel(UserDocument.name) model: Model<UserDocument>) {
    super(model);
  }
}
