declare module '@ioc:Repositories/UserRepository' {
  import type UserRepositoryInterface from "App/Interfaces/Repositories/UserRepositoryInterface"
  const UserRepository: UserRepositoryInterface
  export default UserRepository
}

declare module '@ioc:Repositories/RoleRepository' {
  import type RoleRepositoryInterface from "App/Interfaces/Repositories/RoleRepositoryInterface"
  const RoleRepository:  RoleRepositoryInterface
  export default RoleRepository
}