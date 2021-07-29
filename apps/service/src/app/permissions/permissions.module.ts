import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Permission, PermissionSchema } from './model/permissions.model'
import { PermissionsService } from './permissions.service'
import { PermissionsResolver } from './permissions.resolver'
import { PermissionController } from './permissions.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }]),
  ],
  providers: [PermissionsService, PermissionsResolver],
  controllers: [PermissionController]
})
export class PermissionsModule {}