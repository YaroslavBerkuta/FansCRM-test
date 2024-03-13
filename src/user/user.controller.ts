import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add-user')
  async addUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.addUser(createUserDto);
  }

  @Get('get-user/:id')
  async getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }
}
