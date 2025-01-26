import { AbstractSchema } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserDocument } from 'apps/auth/src/users/user.model';
import { Types } from 'mongoose';

@Schema({
  versionKey: false,
})
export class ReservationDocument extends AbstractSchema {
  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;
  // user: any;
  // place: any;
  // invoice: any;

  @Prop({
    ref: UserDocument.name,
    type: Types.ObjectId,
    required: true,
  })
  user: UserDocument;
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
