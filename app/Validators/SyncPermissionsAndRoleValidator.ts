import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SyncPermissionsAndRoleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    roleName: schema.string(),
    permissions: schema.array().members(schema.string()),
  })

  public messages: CustomMessages = {}
}
