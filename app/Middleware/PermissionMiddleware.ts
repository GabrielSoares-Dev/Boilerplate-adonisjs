import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomException from 'App/Exceptions/CustomException'
import { checkHasPermission } from 'App/Functions/CheckHasPermission'
import type { Permissions } from 'Config/permissions'

export default class PermissionMiddleware {
  public async handle(
    { }: HttpContextContract,
    next: () => Promise<void>,
    guards?: string[]
  ) {

    const permission = guards![0]
    const hasPermission = await checkHasPermission(permission as Permissions)
    if (!hasPermission) {
      throw new CustomException('Access to this resource is denied', 403)
    }

    await next()
  }
}
