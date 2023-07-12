import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.maxLength(150)]),
    phoneNumber: schema.string({}, [rules.mobile()]),
    email: schema.string({}, [
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email',
      }),
    ]),
    password: schema.string({}, [rules.confirmed('confirmPassword')]),
  })
}
