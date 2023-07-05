import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import DefaultResponse from 'Utils/DefaultResponse'

export default class HealthController {
  private defaultResponse: DefaultResponse

  constructor() {
    this.defaultResponse = new DefaultResponse()
  }

  public async health() {
    const report = await HealthCheck.getReport()

    return await this.defaultResponse.successWithContent('Server is running', 200, report)
  }
}
