import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Schema as MongooseSchema } from 'mongoose'

import { Permission, PermissionDocument } from './model/permissions.model'
import {
  CreatePermissionInput,
  ListPermissionInput,
  UpdatePermissionInput,
} from './permissions.inputs'

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>,
  ) {}

  create(payload: CreatePermissionInput) {
    const createdPermission = new this.permissionModel(payload)
    return createdPermission.save()
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.permissionModel.findById(_id).exec()
  }

  list(filters: ListPermissionInput) {
    return this.permissionModel.find({ ...filters }).exec()
  }

  update(payload: UpdatePermissionInput) {
    return this.permissionModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec()
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.permissionModel.findByIdAndDelete(_id).exec()
  }

  createSeeder() {
    const permissions = [
      {
          name: "read-user"
      },
      {
          name: "create-user"
      },
      {
          name: "update-user"
      },
      {
          name: "delete-user"
      }
    ]

    for (const item of permissions) {
      const createdPermission = new this.permissionModel(item)
      createdPermission.save()
    }
    return "sukses"
  }
}