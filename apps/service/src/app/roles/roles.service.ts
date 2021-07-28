import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Schema as MongooseSchema } from 'mongoose'

import { Role, RoleDocument } from './model/roles.model'
import {
  CreateRoleInput,
  ListRoleInput,
  UpdateRoleInput,
} from './roles.inputs'

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>
  ) {}

  create(payload: CreateRoleInput) {
    const createdRole = new this.roleModel(payload)
    return createdRole.save()
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.roleModel.findById(_id).exec()
  }

  list(filters: ListRoleInput) {
    return this.roleModel.find({ ...filters }).exec()
  }

  update(payload: UpdateRoleInput) {
    return this.roleModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec()
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.roleModel.findByIdAndDelete(_id).exec()
  }
}
