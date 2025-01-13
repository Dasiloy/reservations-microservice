import { AbstractSchema } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

export abstract class AbstractRepo<T extends AbstractSchema> {
  protected readonly logger: Logger;

  constructor(protected readonly model: Model<T>) {}

  async create(data: Omit<T, '_id'>): Promise<T> {
    const doc = new this.model({
      ...data,
      _id: new Types.ObjectId(),
    });
    return (await doc.save()).toJSON() as unknown as T;
  }

  async find(filters: FilterQuery<T>): Promise<T[]> {
    return this.model.find(filters).lean<T[]>(true);
  }

  async findOne(filters: FilterQuery<T>): Promise<T> {
    const doc = await this.model.findOne(filters).lean<T>(true);

    if (!doc) {
      this.logger.warn('no document found for', filters);
      throw new NotFoundException('no document found');
    }

    return doc;
  }

  async findOneAndUpdate(
    filters: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<T> {
    const doc = await this.model
      .findOneAndUpdate(filters, update, {
        new: true,
      })
      .lean<T>(true);

    if (!doc) {
      this.logger.warn('no document found for', filters);
      throw new NotFoundException('no document found');
    }

    return doc;
  }

  async findOneAndDelete(filters: FilterQuery<T>): Promise<T> {
    const doc = await this.model.findOneAndDelete(filters).lean<T>(true);

    if (!doc) {
      this.logger.warn('no document found for', filters);
      throw new NotFoundException('no document found');
    }

    return doc;
  }
}
