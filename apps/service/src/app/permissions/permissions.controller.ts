import { Controller, Get } from '@nestjs/common'
import { PermissionsService } from './permissions.service'

@Controller()
export class PermissionController {
  constructor(public readonly permissionService: PermissionsService) {}
  
  @Get('/seeder/permission')
  createSeeder() {
    return this.permissionService.createSeeder()
  }
}
