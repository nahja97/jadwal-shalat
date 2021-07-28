import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Schema as MongooseSchema } from 'mongoose'


import { User, UserDocument } from './model/users.model'
import {
  CreateUserInput,
  ListUserAuth,
  ListUserInput,
  UpdateUserInput,
} from './users.inputs'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  create(payload: CreateUserInput) {
    const createdUser = new this.userModel(payload)
    return createdUser.save()
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.userModel.findById(_id).exec()
  }

  list(filters: ListUserInput) {
    return this.userModel.find({ ...filters }).exec()
  }

  update(payload: UpdateUserInput) {
    return this.userModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec()
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.userModel.findByIdAndDelete(_id).exec()
  }

  login(_id: MongooseSchema.Types.ObjectId) {
    return this.userModel.findById(_id, '_id name username role').exec()
  }
}
