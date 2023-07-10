import {Exception} from '@adonisjs/core/build/standalone'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class CustomException extends Exception {
  public async handle(error: this, ctx: HttpContextContract) {
    const response = {
      statusCode: error.status,
      message: error.message,
    }

    return ctx.response.status(error.status).json(response)
  }
}
