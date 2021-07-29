import { Role } from "../../roles/model/roles.model"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
@Schema()
export class User {
    @Field(() => String)
    _id: MongooseSchema.Types.ObjectId

    @Field(() => String)
    @Prop({ index: {unique: true, dropDups: true} })
    username: string

    @Field(() => String)
    @Prop()
    name: string

    @Field(() => String)
    @Prop()
    password: string

    @Field(() => Role)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: Role.name })
    role: MongooseSchema.Types.ObjectId | Role
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)