import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local-auth.guard';

import { UserDocument } from './users/user.model';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthMessages } from '@app/common/global/enums';
import { JwtGuard } from './guards/jwt-guard';
import { CurrentUser } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@CurrentUser() user: UserDocument, @Res() res: Response) {
    const data = await this.authService.login(user, res);
    res.status(200).json(data);
  }

  @UseGuards(JwtGuard)
  @MessagePattern(AuthMessages.VERIFY_TOKEN)
  async verifyToken(@Payload() data: any) {
    return data.user;
  }
}
