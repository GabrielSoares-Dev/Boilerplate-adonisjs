import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import DefaultResponse from 'App/Utils/DefaultResponse'

export default class UtilsProvider {
  constructor(protected app: ApplicationContract) {}

  public async ready() {}
  public register() {
    this.app.container.singleton('Utils/DefaultResponse', () => {
      const context = this.app.container.resolveBinding('Adonis/Core/HttpContext')
      return new DefaultResponse(context)
    })
  }
}
