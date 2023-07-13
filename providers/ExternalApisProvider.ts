import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class ExternalApisProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('ExternalApis/Ntfy', () => {
      const NtfyServices = require('App/Services/Http/NtfyServices/NtfyServices').default
      return new NtfyServices()
    })
    this.app.container.singleton('ExternalApis/ViaCep', () => {
      const ViaCepServices = require('App/Services/Http/ViaCepServices/ViaCepServices').default
      return new ViaCepServices()
    })
  }

  public async boot() {}

  public async ready() {}

  public async shutdown() {}
}
