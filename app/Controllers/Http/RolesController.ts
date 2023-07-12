import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateRoleService from 'App/Services/RoleServices/CreateRoleService'
import RoleValidator from 'App/Validators/RoleValidator'
import SyncRolesPermissionService from 'App/Services/RoleServices/SyncRolesPermissionService'
import SyncPermissionsAndRoleValidator from 'App/Validators/SyncPermissionsAndRoleValidator'

export default class RolesController {
  private createRoleService: CreateRoleService
  private syncRolesPermissionService: SyncRolesPermissionService

  constructor() {
    this.createRoleService = new CreateRoleService()
    this.syncRolesPermissionService = new SyncRolesPermissionService(

    )
  }
  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(RoleValidator)

    return await this.createRoleService.create(payload.name)
  }

  public async syncPermissionsAndRoles({ request }: HttpContextContract) {
    const payload = await request.validate(SyncPermissionsAndRoleValidator)

    return this.syncRolesPermissionService.syncRolesAndPermission(
      payload.roleName,
      payload.permissions
    )
  }
}
