import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Roles from 'App/Models/Roles'

export default class RolesSeeder extends BaseSeeder {
  public async run() {

    await Roles.createMany([
      {
        name: 'ADMIN',
      }
    ])
  }
}
