import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permissions from 'App/Models/Permissions'
import Roles from 'App/Models/Roles'

export default class RolePermissionsAdminSeeder extends BaseSeeder {
  public async run() {
    const permissionsAdmin = [
      'createPermission',
      'deletePermission',
      'updatePermission',
      'viewPermission',
      'createRole',
      'updateRole',
      'viewRole',
      'deleteRole',
      'syncRolesPermissions',
    ]

    const AdminPermissionsIds = (await Permissions.query().whereIn('name', permissionsAdmin)).map(
      (permission) => permission.id
    )
    const roleAdmin = await Roles.query().where('name', 'ADMIN').first()

    await roleAdmin?.related('permissions').attach(AdminPermissionsIds)
  }
}
