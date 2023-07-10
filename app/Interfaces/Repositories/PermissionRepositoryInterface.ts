export default interface PermissionRepositoryInterface {
  create(name: string): Promise<boolean>
  getPermissionsByNames(permissions: string[])
}
