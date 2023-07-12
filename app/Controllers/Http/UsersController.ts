
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserService from 'App/Services/UsersService/CreateUserService'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import ValidEmailService from 'App/Services/UsersService/ValidEmailService'
import ValidEmailValidator from 'App/Validators/ValidEmailValidator'

export default class UsersController {

  private createUserService: CreateUserService
  private validEmailService: ValidEmailService

  constructor() {
    this.createUserService = new CreateUserService()
    this.validEmailService = new ValidEmailService()
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)

    return await this.createUserService.create(payload)
  }
  public async validEmail({ request }: HttpContextContract) {
    const payload = await request.validate(ValidEmailValidator)

    return await this.validEmailService.validEmail(payload.email)
  }
}
