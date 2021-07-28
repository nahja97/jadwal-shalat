import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'

import { PermissionsModule } from './app/permissions/permissions.module'
import { RolesModule } from './app/roles/roles.module'
import { UsersModule } from './app/users/users.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/apishalat'),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), './apps/service/src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: true,
    }),
    PermissionsModule,
    RolesModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
