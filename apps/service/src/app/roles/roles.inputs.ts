import { Schema as MongooseSchema } from 'mongoose'
import { Field, InputType } from '@nestjs/graphql'

import { Permission } from '../permissions/model/permissions.model'

@InputType()
export class CreateRoleInput {
  @Field(() => String)
  name: string

  @Field(() => [String])
  permissions: MongooseSchema.Types.ObjectId[]
}

@InputType()
export class ListRoleInput {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId

  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => [String], { nullable: true })
  permissions?: MongooseSchema.Types.ObjectId[]
}

@InputType()
export class UpdateRoleInput {
  @Field(() => String, { nullable: true })
  _id: MongooseSchema.Types.ObjectId
  
  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => [String], { nullable: true })
  permissions?: MongooseSchema.Types.ObjectId[]
}