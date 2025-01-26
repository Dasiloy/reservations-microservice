import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../../../../apps/auth/src/users/user.model';

export const CurrentUser = createParamDecorator(
  (data: any, execution: ExecutionContext): UserDocument => {
    const ctx = execution.switchToHttp();
    const req = ctx.getRequest();
    return req.user;
  },
);
