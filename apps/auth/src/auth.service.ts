import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';
import { UserDocument } from './users/user.model';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    // private readonly logger: LoggerService,
  ) {}

  async login(user: UserDocument, res: Response): Promise<UserDocument> {
    const payload: TokenPayload = { sub: user._id.toHexString() };
    const token = this.jwtService.sign(payload);
    res.cookie('jwt', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000), // 1 hour
    });
    return user;
  }

  async verifyUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersService.findByEmail(email);
    const isMatched = bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
