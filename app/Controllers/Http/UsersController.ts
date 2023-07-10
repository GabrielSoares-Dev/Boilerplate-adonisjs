
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserService from 'App/Services/UsersService/CreateUserService'
import CreateUserValidator from 'App/Validators/CreateUserValidator'


export default class UsersController {

  private createUserService: CreateUserService

  constructor() {
    this.createUserService = new CreateUserService()
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)

    return await this.createUserService.create(payload)
  }
}
