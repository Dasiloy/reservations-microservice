import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserDocument } from './user.model';
import { JwtGuard } from '../guards/jwt-guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  async getCurrentUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}
