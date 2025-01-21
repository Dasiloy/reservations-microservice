import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserDocument } from './users/user.model';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@CurrentUser() user: UserDocument, @Res() res: Response) {
    const data = await this.authService.login(user, res);
    res.status(200).json(data);
  }
}
