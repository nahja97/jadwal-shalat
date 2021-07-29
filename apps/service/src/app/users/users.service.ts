import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Schema as MongooseSchema } from 'mongoose'
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt, Strategy } from "passport-jwt";

import { User, UserDocument } from './model/users.model'
import {
  AccessTokenPayload,
  CreateUserInput,
  ListUserAuth,
  ListUserInput,
  RefreshTokenAuth,
  RefreshTokenPayload,
  UpdateUserInput,
} from './users.inputs'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
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

  assignRefreshToken(payload: RefreshTokenAuth) {
    const decodeRefreshToken = this.jwtService.verify(payload.refresh_token)
    if (decodeRefreshToken.access_token == payload.access_token) {
      const user = this.userModel.findById(decodeRefreshToken._id, '_id name username role').exec()
      return user
    }

    throw new Error('Please register or sign in.')
  }

  createAccessToken(payload: AccessTokenPayload) {
    return this.jwtService.sign(payload)
  }

  createRefreshToken(payload: RefreshTokenPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: '7d',
    })
  }
}
