import { AbstractSchema } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
