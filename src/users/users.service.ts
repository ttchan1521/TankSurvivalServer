import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Redis } from 'ioredis';
import { Model } from 'mongoose';
import { REDIS_CLIENT_TOKEN } from '../redis/redis.module';
import {
  CreateUserDto,
  ListUserDto,
  ListUserModeDto,
  UpdateUserScoreDto,
  UserRankDto,
} from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Score, ScoreDocument } from './schemas/score.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Score.name) private readonly scoreModel: Model<ScoreDocument>,
    @Inject(REDIS_CLIENT_TOKEN)
    private readonly redisClient: Redis,
  ) {}
  /**
   * Create user
   * @param createUserDto
   * @returns
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    newUser.save();

    // Push user's info to redis using hashes data type
    this.redisClient.hmset(
      `user:${newUser.id}`,
      'username',
      createUserDto.username,
    );

    return newUser;
  }

  /**
   * Update user's score
   * @param updateUserScoreDto
   */
  async updateUserScore(
    updateUserScoreDto: UpdateUserScoreDto,
  ): Promise<Score> {
    const { userId, score, mode, op } = updateUserScoreDto;

    let updateScore: Score;
    switch (op) {
      default:
      case 'set':
        updateScore = await this.scoreModel.findOneAndUpdate(
          { user: userId, mode: mode },
          { score: score },
          { new: true, upsert: true },
        );
        this.redisClient.zadd(
          `user:leaderboard:${mode}`,
          score,
          `user:${userId}`,
        );
        break;
      case 'best':
        updateScore = await this.scoreModel.findOneAndUpdate(
          { user: userId, mode: mode },
          { $max: { score: score } },
          { new: true, upsert: true },
        );
        this.redisClient.zadd(
          `user:leaderboard:${mode}`,
          'GT',
          score,
          `user:${userId}`,
        );
        break;
      case 'incr':
        updateScore = await this.scoreModel.findOneAndUpdate(
          { user: userId, mode: mode },
          { $inc: { score: score } },
          { new: true, upsert: true },
        );
        this.redisClient.zadd(
          `user:leaderboard:${mode}`,
          'INCR',
          score,
          `user:${userId}`,
        );
        break;
      case 'decr':
        updateScore = await this.scoreModel.findOneAndUpdate(
          { user: userId, mode: mode },
          { $inc: { score: -score } },
          { new: true, upsert: true },
        );
        this.redisClient.zadd(
          `user:leaderboard:${mode}`,
          'INCR',
          -score,
          `user:${userId}`,
        );
        break;
    }

    return updateScore;
  }

  /**
   * Get list user
   * @param listUserDto
   */
  async getUsers(listUserDto: ListUserDto) {
    const pagination = listUserDto.pagination;

    if (pagination) {
      return await this.userModel.find();
    }

    const page = listUserDto.page || 1;
    const perPage = listUserDto.perPage || 10;
    const skip = (page - 1) * perPage;

    return await this.userModel.find().skip(skip).limit(perPage);
  }

  async getUser(userId: string) {
    return await this.userModel.findById(userId);
  }

  /**
   * Get user's rank
   * @param listUserModeDto
   */
  async leaderBoard(listUserModeDto: ListUserModeDto) {
    const page = listUserModeDto.page || 1;
    const perPage = listUserModeDto.perPage || 10;
    const min = (page - 1) * perPage;
    const max = min + (perPage - 1);

    // Get leaderboard (sorted data) using zrevrange
    const leaderboard = await this.redisClient.zrevrange(
      `user:leaderboard:${listUserModeDto.mode}`,
      min,
      max,
      'WITHSCORES',
    );

    const results = [];
    for (let i = 0; i < leaderboard.length; i += 2) {
      // Get user info from redis (hashes data)
      const userInfo = await this.redisClient.hgetall(leaderboard[i]);
      const user = {
        ...userInfo,
        score: leaderboard[i + 1],
      };
      results.push(user);
    }
    return results;
  }

  /**
   * Get user's rank
   * @param userRankDto
   */
  async rank(userRankDto: UserRankDto) {
    const [userInfo, rank] = await Promise.all([
      this.redisClient.hgetall(`user:${userRankDto.userId}`),
      this.redisClient.zrevrank(
        `user:leaderboard:${userRankDto.mode}`,
        `user:${userRankDto.userId}`,
      ),
    ]);
    const result = {
      ...userInfo,
      rank,
    };
    return result;
  }
}
