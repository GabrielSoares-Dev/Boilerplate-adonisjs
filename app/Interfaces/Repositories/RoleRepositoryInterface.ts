export default interface RoleRepositoryInterface {
  create(name: string): Promise<boolean>
  findByName(roleName: string)
  syncRolesAndPermissions(roleName: string, permissionsIds: number[])
}
