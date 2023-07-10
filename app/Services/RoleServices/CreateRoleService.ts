import DefaultResponse from 'App/Utils/DefaultResponse'
import RoleLucidRepository from 'App/Repositories/RoleRepository/RoleLucidRepository'

export default class CreateRoleService {
  constructor(
    private readonly defaultResponse: DefaultResponse,
    private readonly roleRepository: RoleLucidRepository
  ) {
    this.roleRepository = roleRepository
    this.defaultResponse = defaultResponse
  }

  public async create(name: string) {
    await this.roleRepository.create(name)
    return await this.defaultResponse.success('Role created successfully', 201)
  }
}
