import {
    Args,
    Mutation,
    Query,
    Resolver,
  } from '@nestjs/graphql'
  import { Schema as MongooseSchema } from 'mongoose'

import { Permission } from './model/permissions.model'
import { PermissionsService } from './permissions.service'
import {
  CreatePermissionInput,
  ListPermissionInput,
  UpdatePermissionInput,
} from './permissions.inputs'

@Resolver(() => Permission)
export class PermissionsResolver {
  constructor(private permissionService: PermissionsService) {}

  @Query(() => Permission)
  async permission(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.permissionService.getById(_id)
  }

  @Query(() => [Permission])
  async permissions(
    @Args('filters', { nullable: true }) filters?: ListPermissionInput,
  ) {
    return this.permissionService.list(filters)
  }

  @Mutation(() => Permission)
  async createPermission(@Args('payload') payload: CreatePermissionInput) {
    return this.permissionService.create(payload)
  }

  @Mutation(() => Permission)
  async updatePermission(@Args('payload') payload: UpdatePermissionInput) {
    return this.permissionService.update(payload)
  }

  @Mutation(() => Permission)
  async deletePermission(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.permissionService.delete(_id)
  }
}