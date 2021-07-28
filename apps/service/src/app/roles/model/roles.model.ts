import { Permission } from "../../permissions/model/permissions.model"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
@Schema()
export class Role {
    @Field(() => String)
    _id: MongooseSchema.Types.ObjectId

    @Field(() => String)
    @Prop({index: {unique: true, dropDups: true}})
    name: string

    @Field(() => [Permission])
    @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Permission.name })
    permissions: MongooseSchema.Types.ObjectId[] | Permission[]
}

export type RoleDocument = Role & Document

export const RoleSchema = SchemaFactory.createForClass(Role)