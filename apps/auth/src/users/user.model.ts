import { AbstractSchema } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
})
export class UserDocument extends AbstractSchema {
  @Prop()
  email: string;

  @Prop()
  password: string;
  // user: any;
  // place: any;
  // invoice: any;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
