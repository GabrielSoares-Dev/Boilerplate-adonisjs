import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Roles from 'App/Models/Roles'
import Users from 'App/Models/Users'

export default class AdminSeeder extends BaseSeeder {
  public async run() {
    const roleAdmin = await Roles.query().where('name', 'ADMIN').first()

    await Users.create({
      name: 'admin',
      password: 'Admin@12',
      email: 'admin@gmail.com',
      phoneNumber: '112333333',
      roleId: roleAdmin?.id,
      roleName: 'ADMIN',
    })
  }
}
