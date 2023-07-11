import Roles from "App/Models/Roles"
export default interface RoleRepositoryInterface {
  create(name: string): Promise<boolean>
  findByName(roleName: string):Promise<Roles | null>
  syncRolesAndPermissions(roleName: string, permissionsIds: number[])
}
