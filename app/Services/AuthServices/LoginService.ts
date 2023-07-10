import DefaultResponse from 'App/Utils/DefaultResponse'
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import UserLucidRepository from 'App/Repositories/UserRepository/UserLucidRepository'
import Hash from '@ioc:Adonis/Core/Hash'
import CustomException from 'App/Exceptions/CustomException'

export default class LoginService {
  constructor(
    private readonly defaultResponse: DefaultResponse,
    private readonly httpContext: typeof HttpContext,
    private readonly userRepository: UserLucidRepository,
    private readonly hash: typeof Hash
  ) {
    this.defaultResponse = defaultResponse
    this.httpContext = httpContext
    this.userRepository = userRepository
    this.hash = hash
  }
  public async login(email: string, password: string) {
    const ctx = await this.httpContext.get()
    const user = await this.userRepository.findByEmail(email)
    const isInvalidCredentials = !user || !(await this.hash.verify(user?.password!, password))

    if (isInvalidCredentials) {
      throw new CustomException('Invalid Credentials', 401)
    }

    let userInfos
    const token = await ctx?.auth.use('api').generate(user)
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
      const schoolInReviewOrCanceled =
        school?.status === 'CANCELED' || school?.status === 'INREVIEW'
      if (schoolInReviewOrCanceled) {
        throw new CustomException(
          'Access denied. The user account is currently under review or has been canceled',
          403
        )
      }
      userInfos = {
        ...userData,
        schoolData: school,
        permissions,
      }
    }

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

    return await this.defaultResponse.successWithContent('Authenticated', 200, data)
  }
}
