import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class UtilsProvider {
  constructor(protected app: ApplicationContract) {}

  public async ready() {}
  public register() {
    this.app.container.singleton('Utils/DefaultResponse', () => {
      const DefaultResponse = require('App/Utils/DefaultResponse').default
      const context = this.app.container.resolveBinding('Adonis/Core/HttpContext')
      return new DefaultResponse(context)
    })
    this.app.container.singleton('Utils/FormatDate', () => {
      const FormatDate = require('App/Utils/FormatDate').default
      return new FormatDate()
    })
  }
}
