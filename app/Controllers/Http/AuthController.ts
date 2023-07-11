import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginService from 'App/Services/AuthServices/LoginService'
import MeService from 'App/Services/AuthServices/MeService'
import LogoutService from 'App/Services/AuthServices/LogoutService'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {

  private loginService: LoginService
  private meService: MeService
  private logoutService: LogoutService

  constructor() {
    this.loginService = new LoginService()
    this.meService = new MeService()
    this.logoutService = new LogoutService()
  }
  public async login({ request }: HttpContextContract) {
    const payload = await request.validate(LoginValidator)

    return await this.loginService.login(payload.email, payload.password)
  }
  public async me() {
    return await this.meService.me()
  }

  public async logout() {
    return await this.logoutService.logout()
  }
}
