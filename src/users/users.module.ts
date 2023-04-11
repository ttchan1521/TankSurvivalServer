import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { Score, ScoreSchema } from './schemas/score.schema';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', function () {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const user = this;
            if (user.password) {
              const salt = bcrypt.genSaltSync(10);
              const hash = bcrypt.hashSync(user.password, salt);
              user.password = hash;
            }
          });
          return schema;
        },
      },
      {
        name: Score.name,
        useFactory: () => ScoreSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
