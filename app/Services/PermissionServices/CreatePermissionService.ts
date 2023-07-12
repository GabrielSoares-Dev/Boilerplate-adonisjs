import PermissionRepository from "@ioc:Repositories/PermissionRepository"
import DefaultResponse from "@ioc:Utils/DefaultResponse"
export default class CreatePermissionService {
  public async create(name: string) {
    await PermissionRepository.create(name)
    return await DefaultResponse.success('Permission created successfully', 201)
  }
}
