import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import UserLucidRepository from 'App/Repositories/UserRepository/UserLucidRepository'
import RoleLucidRepository from 'App/Repositories/RoleRepository/RoleLucidRepository'
import Roles from 'App/Models/Roles'
import Users from 'App/Models/Users'

export default class RepositoriesProvider {
  constructor(protected app: ApplicationContract) { }

  public register() {
    this.app.container.singleton('Repositories/UserRepository', () => {
     this.app.container.resolveBinding('Adonis/Lucid/Orm')

      return new UserLucidRepository(Users)
    })
    this.app.container.singleton('Repositories/RoleRepository', () => {
      const RolesModel = this.app.container.resolveBinding('Adonis/Lucid/Orm') as unknown as typeof Roles

      return new RoleLucidRepository(RolesModel)
    })

  }


  public async ready() {

  }

}
