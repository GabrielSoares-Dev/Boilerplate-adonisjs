import type { Permissions } from "Config/permissions"
import HttpContext from '@ioc:Adonis/Core/HttpContext'

export const checkHasPermission = async (expectedPermission: Permissions) => {
  const ctx = await HttpContext.get()
  const roleId = await ctx?.auth.user?.roleId
  const role = await ctx?.auth.user?.related('role').query().where('id', roleId!).first()
  const permissions = (await role?.related('permissions').query()!).map(
    (permission) => permission.name
  )

  return permissions.includes(expectedPermission)
}