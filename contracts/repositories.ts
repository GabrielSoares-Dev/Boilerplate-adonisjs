declare module '@ioc:Repositories/UserRepository' {
  import type UserRepositoryInterface from 'App/Interfaces/Repositories/UserRepositoryInterface'
  const UserRepository: UserRepositoryInterface
  export default UserRepository
}

declare module '@ioc:Repositories/RoleRepository' {
  import type RoleRepositoryInterface from 'App/Interfaces/Repositories/RoleRepositoryInterface'
  const RoleRepository: RoleRepositoryInterface
  export default RoleRepository
}
declare module '@ioc:Repositories/PermissionRepository' {
  import type PermissionRepositoryInterface from 'App/Interfaces/Repositories/PermissionRepositoryInterface'
  const PermissionRepository: PermissionRepositoryInterface
  export default PermissionRepository
}
