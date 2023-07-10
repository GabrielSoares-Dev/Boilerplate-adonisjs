import DefaultResponse from 'App/Utils/DefaultResponse'
import HttpContext from '@ioc:Adonis/Core/HttpContext'

export default class MeService {
  constructor(
    private readonly httpContext: typeof HttpContext,
    private readonly defaultResponse: DefaultResponse
  ) {
    this.httpContext = httpContext
    this.defaultResponse = defaultResponse
  }
  public async me() {
    let user
    const ctx = await this.httpContext.get()
    const isSchool = (await ctx?.auth.user?.roleName) === 'SCHOOL'
    const isAdmin = (await ctx?.auth.user?.roleName) === 'ADMIN'
    const roleId = await ctx?.auth.user?.roleId
    const role = await ctx?.auth.user?.related('role').query().where('id', roleId!).first()
    const permissions = (await role?.related('permissions').query()!).map(
      (permission) => permission.name
    )
    const userData = await ctx?.auth.user?.serialize()

    if (isSchool) {
      const school = await ctx?.auth.user?.related('school').query().first()
      user = {
        ...userData,
        schoolData: school,
        permissions,
      }
    }

    if (isAdmin) {
      user = {
        ...userData,
        permissions: permissions,
      }
    }

    return await this.defaultResponse.successWithContent(
      'User information successfully returned',
      200,
      user
    )
  }
}
