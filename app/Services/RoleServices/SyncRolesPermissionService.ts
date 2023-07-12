import DefaultResponse from '@ioc:Utils/DefaultResponse'
import RoleRepository from '@ioc:Repositories/RoleRepository'
import PermissionRepository from '@ioc:Repositories/PermissionRepository'
import CustomException from 'App/Exceptions/CustomException'

export default class SyncRolesPermissionService {
  public async syncRolesAndPermission(roleName: string, permissionsNames: string[]) {
    const role = await RoleRepository.findByName(roleName)

    if (!role) {
      throw new CustomException('Role not found', 404)
    }
    const permissions = await PermissionRepository.getPermissionsByNames(permissionsNames)

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

    await RoleRepository.syncRolesAndPermissions(roleName, permissionsIds)
    return await DefaultResponse.success(
      'Synchronized permissions with the role successfully',
      200
    )
  }
}
