import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from '../auth/jwt.strategy';

import { User, UserSchema } from './model/users.model'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12800s' },
    }),
  ],
  providers: [UsersService, UsersResolver, JwtStrategy]
})
export class UsersModule {}
