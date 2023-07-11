import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permissions from 'App/Models/Permissions'

export default class PermissionsSeeder extends BaseSeeder {
  public async run() {

    await Permissions.createMany([
      {
        name: 'createPermission',
      },
      {
        name: 'deletePermission',
      },
      {
        name: 'updatePermission',
      },
      {
        name: 'viewPermission',
      },
      {
        name: 'createRole',
      },
      {
        name: 'updateRole',
      },
      {
        name: 'viewRole',
      },
      {
        name: 'deleteRole',
      },
      {
        name: 'syncRolesPermissions',
      },
    ])
  }
}
