import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomException from 'App/Exceptions/CustomException'
import { checkHasPermission } from 'App/Functions/CheckHasPermission'
import type { Permissions } from 'Config/permissions'

export default class PermissionMiddleware {
  public async handle(
    { auth}: HttpContextContract,
    next: () => Promise<void>,
    guards?: string[]
  ) {


    const roleId = await auth.user?.roleId
    const role = await auth.user?.related('role').query().where('id', roleId!).first()
    const permissions = (await role?.related('permissions').query()!).map(
      (permission) => permission.name
    )
    const permission = guards![0]
    const hasPermission = await checkHasPermission(permission as Permissions,permissions as Permissions[])
    if (!hasPermission) {
      throw new CustomException('Access to this resource is denied', 403)
    }

    await next()
  }
}
