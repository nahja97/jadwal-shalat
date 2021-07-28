import {
    Args,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
  } from '@nestjs/graphql'
import { Schema as MongooseSchema } from 'mongoose'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const round = 10
const salt = bcrypt.genSaltSync(round);

import { User, UserDocument } from './model/users.model'
import { Auth } from './model/auth.model'
import { UsersService } from './users.service'
import {
  CreateUserInput,
  ListUserAuth,
  ListUserInput,
  UpdateUserInput,
} from './users.inputs'

import { Role } from '../roles/model/roles.model'
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UsersService, private readonly jwtService: JwtService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async user(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.userService.getById(_id)
  }

  @Query(() => [User])
  async users(
    @Args('filters', { nullable: true }) filters?: ListUserInput,
  ) {
    return this.userService.list(filters)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async createUser(@Args('payload') payload: CreateUserInput) {
    payload.password = bcrypt.hashSync(payload.password, salt)
    return this.userService.create(payload)
  }

  @Mutation(() => User)
  async updateUser(@Args('payload') payload: UpdateUserInput) {
    return this.userService.update(payload)
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.userService.delete(_id)
  }

  @Mutation(() => Auth)
  async login(
    @Args('payload') payload?: ListUserAuth,
  ) {
    const user = await this.userService.list({'username': payload.username})
    const res = await bcrypt.compare(payload.password, user[0].password)
    if (res) {
      const userData = await this.userService.login(user[0]._id)
      const dataToken = {
        _id: userData._id,
        name: userData.name,
        role: userData.role,
        username: userData.username
      }
      const token = this.jwtService.sign(dataToken)

      const response = {
        '_id': userData._id,
        'username': userData.username,
        'name': userData.name,
        'role': (await userData.populate({ path: 'role', model: Role.name }).execPopulate()).role,
        'access_token': token,
      }
      return response
    }
    return null
  }

  @ResolveField()
  async role(
    @Parent() user: UserDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate)
      await user
        .populate({ path: 'role', model: Role.name })
        .execPopulate()

    return user.role
  }
}