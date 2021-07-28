import {
    Args,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
  } from '@nestjs/graphql'
  import { Schema as MongooseSchema } from 'mongoose'

import { User, UserDocument } from './model/users.model'
import { UsersService } from './users.service'
import {
  CreateUserInput,
  ListUserInput,
  UpdateUserInput,
} from './users.inputs'

import { Role } from '../roles/model/roles.model'

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}

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

  @Mutation(() => User)
  async createUser(@Args('payload') payload: CreateUserInput) {
      console.log(payload)
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