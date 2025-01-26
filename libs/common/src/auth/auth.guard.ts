import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { AUTH_CLIENT } from './auth.constnats';
import { ClientProxy } from '@nestjs/microservices';
import { AuthMessages } from '../global/enums';
import { UserDocument } from 'apps/auth/src/users/user.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.jwt;

    if (!jwt) {
      return Promise.resolve(false);
    }

    return this.authClient
      .send<UserDocument>(AuthMessages.VERIFY_TOKEN, { jwt })
      .pipe(
        tap((user) => {
          context.switchToHttp().getRequest().user = user;
        }),
        map((user) => !!user),
      );
  }
}
