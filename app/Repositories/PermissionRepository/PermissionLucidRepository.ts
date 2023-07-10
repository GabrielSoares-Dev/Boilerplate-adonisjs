import Permissions from 'App/Models/Permissions'
import type PermissionRepositoryInterface from 'App/Interfaces/Repositories/PermissionRepositoryInterface'

export default class PermissionLucidRepository implements PermissionRepositoryInterface {
  constructor(private readonly model: typeof Permissions) {
    this.model = model
  }
  public async create(name: string): Promise<boolean> {
    await this.model.create({
      name,
    })

    return true
  }

  public async getPermissionsByNames(permissions: string[]) {
    return await this.model.query().whereIn('name', permissions)
  }
}
