import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { base64 } from '@ioc:Adonis/Core/Helpers'
import Env from '@ioc:Adonis/Core/Env'
import CustomException from 'App/Exceptions/CustomException'

export default class BasicAuth {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    const authHeader = request.header('Authorization')
    const notHasBasic = !authHeader || !authHeader.startsWith('Basic ')

    if (notHasBasic) {
      throw new CustomException('Please give me basic', 401)
    }

    const base64Credentials = authHeader.replace('Basic ', '')
    const credentials = base64.decode(base64Credentials).split(':')
    const username = credentials[0]
    const password = credentials[1]

    const invalidBasic =
      username !== Env.get('AUTHENTICATOR_USERNAME') ||
      password !== Env.get('AUTHENTICATOR_PASSWORD')
    if (invalidBasic) {
      throw new CustomException('Invalid basic crendentials', 401)
    }

    await next()
  }
}
