import type { GuardsList } from '@ioc:Adonis/Addons/Auth'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomException from 'App/Exceptions/CustomException'

export default class AuthMiddleware {
  protected async authenticate(auth: HttpContextContract['auth'], guards: (keyof GuardsList)[]) {
    //@ts-ignore
    let guardLastAttempted: string | undefined

    for (let guard of guards) {
      guardLastAttempted = guard

      if (await auth.use(guard).check()) {
        auth.defaultGuard = guard

        return true
      }
    }

    throw new CustomException('Unauthorized', 401)
  }

  public async handle(
    { auth }: HttpContextContract,
    next: () => Promise<void>,
    customGuards: (keyof GuardsList)[]
  ) {
    const guards = customGuards.length ? customGuards : [auth.name]
    await this.authenticate(auth, guards)
    await next()
  }
}
