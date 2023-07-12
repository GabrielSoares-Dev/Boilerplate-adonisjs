import DefaultResponse from '@ioc:Utils/DefaultResponse'
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import CustomException from 'App/Exceptions/CustomException'
import UserRepository from '@ioc:Repositories/UserRepository'

export default class LoginService {
  public async login(email: string, password: string) {
    const ctx = await HttpContext.get()
    const user = await UserRepository.findByEmail(email)
    const isInvalidCredentials = !user || !(await Hash.verify(user?.password!, password))

    if (isInvalidCredentials) {
      throw new CustomException('Invalid Credentials', 401)
    }

    let userInfos
    const token = await ctx?.auth.use('api').generate(user)
    const isAdmin = (await ctx?.auth.user?.roleName) === 'ADMIN'
    const roleId = await ctx?.auth.user?.roleId
    const role = await ctx?.auth.user?.related('role').query().where('id', roleId!).first()
    const permissions = (await role?.related('permissions').query()!).map(
      (permission) => permission.name
    )
    const userData = await ctx?.auth.user?.serialize()

    if (isAdmin) {
      userInfos = {
        ...userData,
        permissions: permissions,
      }
    }
    const data = {
      accessToken: token,
      user: userInfos,
    }

    return await DefaultResponse.successWithContent('Authenticated', 200, data)
  }
}
