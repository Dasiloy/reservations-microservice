import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({
  versionKey: false,
  timestamps: true,
})
export class AbstractSchema {
  @Prop({
    type: SchemaTypes.ObjectId,
  })
  _id: Types.ObjectId;
}
