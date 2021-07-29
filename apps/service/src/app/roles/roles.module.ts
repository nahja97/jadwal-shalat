import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Role, RoleSchema } from './model/roles.model'
import { RolesService } from './roles.service'
import { RolesResolver } from './roles.resolver'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [RolesService, RolesResolver],
})
export class RolesModule {}