import {
    Args,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
  } from '@nestjs/graphql'
  import { Schema as MongooseSchema } from 'mongoose'

import { Role, RoleDocument } from './model/roles.model'
import { RolesService } from './roles.service'
import {
  CreateRoleInput,
  ListRoleInput,
  UpdateRoleInput,
} from './roles.inputs'

import { Permission } from '../permissions/model/permissions.model'

@Resolver(() => Role)
export class RolesResolver {
  constructor(private roleService: RolesService) {}

  @Query(() => Role)
  async role(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.roleService.getById(_id)
  }

  @Query(() => [Role])
  async roles(
    @Args('filters', { nullable: true }) filters?: ListRoleInput,
  ) {
    return this.roleService.list(filters)
  }

  @Mutation(() => Role)
  async createRole(@Args('payload') payload: CreateRoleInput) {
    return this.roleService.create(payload)
  }

  @Mutation(() => Role)
  async updateRole(@Args('payload') payload: UpdateRoleInput) {
    return this.roleService.update(payload)
  }

  @Mutation(() => Role)
  async deleteRole(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.roleService.delete(_id)
  }

  @ResolveField()
  async permissions(
    @Parent() role: RoleDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate)
      await role
        .populate({ path: 'permissions', model: Permission.name })
        .execPopulate()

    return role.permissions
  }
}