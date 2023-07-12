import Roles from 'App/Models/Roles'
import type RoleRepositoryInterface from 'App/Interfaces/Repositories/RoleRepositoryInterface'

export default class RoleLucidRepository implements RoleRepositoryInterface {
  constructor(private readonly model: typeof Roles) {}

  public async create(name: string): Promise<boolean> {
    await this.model.create({
      name,
    })

    return true
  }

  public async findByName(roleName: string): Promise<Roles | null> {
    return await this.model.findBy('name', roleName)
  }

  public async syncRolesAndPermissions(roleName: string, permissionsIds: number[]) {
    const role = await this.model.query().where('name', roleName).first()

    await role?.related('permissions').attach(permissionsIds)

    return true
  }
}
