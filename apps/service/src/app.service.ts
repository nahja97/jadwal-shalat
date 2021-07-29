import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createSeeder(): string {
    return "sukses"
  }
}
