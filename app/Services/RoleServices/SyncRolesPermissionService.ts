import DefaultResponse from 'App/Utils/DefaultResponse'
import RoleLucidRepository from 'App/Repositories/RoleRepository/RoleLucidRepository'
import PermissionLucidRepository from 'App/Repositories/PermissionRepository/PermissionLucidRepository'
import CustomException from 'App/Exceptions/CustomException'

export default class SyncRolesPermissionService {
  constructor(
    private readonly defaultResponse: DefaultResponse,
    private readonly roleRepository: RoleLucidRepository,
    private readonly permissionRepository: PermissionLucidRepository
  ) {
    this.roleRepository = roleRepository
    this.defaultResponse = defaultResponse
    this.permissionRepository = permissionRepository
  }

  public async syncRolesAndPermission(roleName: string, permissionsNames: string[]) {
    const role = await this.roleRepository.findByName(roleName)

    if (!role) {
      throw new CustomException('Role not found', 404)
    }
    const permissions = await this.permissionRepository.getPermissionsByNames(permissionsNames)

    const permissionsIds = permissions.map((permission) => permission.id)

    const nonExistentPermissions = permissionsNames.filter(
      (permissionName) => !permissions.find((p) => p.name === permissionName)
    )
    const hasNonExistentPermission = nonExistentPermissions.length > 0

    if (hasNonExistentPermission) {
      throw new CustomException(`These permissions do not exist: ${nonExistentPermissions}`, 404)
    }

    const uniquePermissions = new Set(permissionsNames)
    const hasDuplicates = uniquePermissions.size !== permissionsNames.length
    if (hasDuplicates) {
      const duplicatePermissions = permissionsNames.filter(
        (permissionName, index) => permissionsNames.indexOf(permissionName) !== index
      )

      throw new CustomException(`There are duplicate permissions: ${duplicatePermissions}`, 400)
    }

    await this.roleRepository.syncRolesAndPermissions(roleName, permissionsIds)
    return await this.defaultResponse.success(
      'Synchronized permissions with the role successfully',
      200
    )
  }
}
