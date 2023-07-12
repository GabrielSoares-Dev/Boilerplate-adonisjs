import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import DefaultResponse from '@ioc:Utils/DefaultResponse'

export default class HealthController {
  public async health() {
    const report = await HealthCheck.getReport()

    return await DefaultResponse.successWithContent('Server is running', 200, report)
  }
}
