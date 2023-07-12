import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Application from '@ioc:Adonis/Core/Application'

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../Roles/RolesSeeder'))
    await this.runSeeder(await import('../Permissions/PermissionsSeeder'))
    await this.runSeeder(await import('../RolePermissions/RolePermissionsAdminSeeder'))

    const isTestEnviroment = Application.inTest

    if (isTestEnviroment) {
      await this.runSeeder(await import('../Users/AdminSeeder'))
    }
  }
}
