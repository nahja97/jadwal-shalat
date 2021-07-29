import { Schema as MongooseSchema } from 'mongoose'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreatePermissionInput {
  @Field(() => String)
  name: string
}

@InputType()
export class ListPermissionInput {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId

  @Field(() => String, { nullable: true })
  name?: string
}

@InputType()
export class UpdatePermissionInput {
  @Field(() => String, { nullable: true })
  _id: MongooseSchema.Types.ObjectId
  
  @Field(() => String, { nullable: true })
  name?: string
}