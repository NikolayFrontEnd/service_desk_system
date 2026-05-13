import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

   @Get('my-assigned-repair-tasks')
  @UseGuards(JwtAuthGuard)
  getMyAssignedRepairTasks(@Req() request: any) {
    const userId = request.user.sub;

    return this.usersService.getMyAssignedRepairTasks(userId);
  }
}
