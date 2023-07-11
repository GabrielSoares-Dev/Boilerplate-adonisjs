
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserService from 'App/Services/UsersService/CreateUserService'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import { inject } from '@adonisjs/core/build/standalone';


@inject()
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
