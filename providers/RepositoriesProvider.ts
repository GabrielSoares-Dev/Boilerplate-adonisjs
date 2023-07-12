import type { ApplicationContract } from '@ioc:Adonis/Core/Application'


export default class RepositoriesProvider {
  constructor(protected app: ApplicationContract) { }

  public register() {
    this.app.container.bind('Repositories/UserRepository', () => {
      const UserLucidRepository = require('App/Repositories/UserRepository/UserLucidRepository').default
      const userModel = require('App/Models/Users').default

      return new UserLucidRepository(userModel)
    })
    this.app.container.bind('Repositories/RoleRepository', () => {
      const RoleLucidRepository = require('App/Repositories/RoleRepository/RoleLucidRepository').default
      const rolesModel = require('App/Models/Roles').default

      return new RoleLucidRepository(rolesModel)
    })
    this.app.container.bind('Repositories/PermissionRepository', () => {
      const PermissionLucidRepository = require('App/Repositories/PermissionRepository/PermissionLucidRepository').default
      const permissionsModel = require('App/Models/Permissions').default

      return new PermissionLucidRepository(permissionsModel)
    })

  }

}
