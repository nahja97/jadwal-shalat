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

const round = 10
const salt = bcrypt.genSaltSync(round);

import { User, UserDocument } from './model/users.model'
import { Auth } from './model/auth.model'
import { UsersService } from './users.service'
import {
  CreateUserInput,
  ListUserAuth,
  ListUserInput,
  RefreshTokenAuth,
  UpdateUserInput,
} from './users.inputs'

import { Role } from '../roles/model/roles.model'
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UsersService, ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async user(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.userService.getById(_id)
  }

  @UseGuards(GqlAuthGuard)
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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(@Args('payload') payload: UpdateUserInput) {
    return this.userService.update(payload)
  }

  @UseGuards(GqlAuthGuard)
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

      console.log(dataToken.role)
      const accessToken = this.userService.createAccessToken(dataToken)
      const refreshToken = this.userService.createRefreshToken({_id: dataToken._id, access_token: accessToken})
      
      const response = {
        '_id': userData._id,
        'username': userData.username,
        'name': userData.name,
        'role': (await userData.populate({ path: 'role', model: Role.name }).execPopulate()).role,
        'access_token': accessToken,
        'refresh_token': refreshToken,
      }
      return response
    }
    return null
  }

  @Mutation(() => Auth)
  async refreshToken(
    @Args('payload') payload?: RefreshTokenAuth,
  ) {
    try {
      const userData = await this.userService.assignRefreshToken(payload)
      const dataToken = {
        _id: userData._id,
        name: userData.name,
        role: userData.role,
        username: userData.username
      }
      const accessToken = this.userService.createAccessToken(dataToken)
      const refreshToken = this.userService.createRefreshToken({_id: dataToken._id, access_token: accessToken})
      const response = {
        '_id': userData._id,
        'username': userData.username,
        'name': userData.name,
        'role': (await userData.populate({ path: 'role', model: Role.name }).execPopulate()).role,
        'access_token': accessToken,
        'refresh_token': refreshToken,
      }

      return response
    } catch(err) {
      throw new Error(err)
    }
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