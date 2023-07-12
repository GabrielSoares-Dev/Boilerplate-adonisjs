import RoleRepository from '@ioc:Repositories/RoleRepository'
import DefaultResponse from '@ioc:Utils/DefaultResponse'

export default class CreateRoleService {
  public async create(name: string) {
    await RoleRepository.create(name)
    return await DefaultResponse.success('Role created successfully', 201)
  }
}
