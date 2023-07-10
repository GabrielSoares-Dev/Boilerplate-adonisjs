import DefaultResponse from 'App/Utils/DefaultResponse'
import PermissionLucidRepository from 'App/Repositories/PermissionRepository/PermissionLucidRepository'
export default class CreatePermissionService {
  constructor(
    private readonly defaultResponse: DefaultResponse,
    private readonly permissionRepository: PermissionLucidRepository
  ) {
    this.permissionRepository = permissionRepository
    this.defaultResponse = defaultResponse
  }

  public async create(name: string) {
    await this.permissionRepository.create(name)
    return await this.defaultResponse.success('Permission created successfully', 201)
  }
}
