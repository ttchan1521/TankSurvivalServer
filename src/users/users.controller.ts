import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import {
  CreateUserDto,
  ListUserDto,
  ListUserModeDto,
  UpdateUserScoreDto,
  UserDto,
  UserRankDto,
} from './dto/user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { Score } from './schemas/score.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @Patch()
  async updateUserScore(
    @Body() updateUserScoreDto: UpdateUserScoreDto,
  ): Promise<Score> {
    return await this.userService.updateUserScore(updateUserScoreDto);
  }

  @Get()
  async getUsers(@Query() listUserDto: ListUserDto) {
    return await this.userService.getUsers(listUserDto);
  }

  @Get('leaderboard')
  async leaderBoard(@Query() listUserModeDto: ListUserModeDto) {
    return await this.userService.leaderBoard(listUserModeDto);
  }

  @Get('rank')
  async rank(@Query() userRankDto: UserRankDto) {
    return await this.userService.rank(userRankDto);
  }

  @Get('user')
  async getUser(@Query() userDto: UserDto) {
    console.log(JSON.stringify(userDto));
    return await this.userService.getUser(userDto.userId);
  }
}
