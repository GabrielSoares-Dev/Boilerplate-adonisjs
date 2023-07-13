import { ntfyApi } from 'App/Services/Apis/NtfyApi'
import type { SendNotificationProps } from 'App/Services/types/Http/NtfyServices/SendNotificationProps'
import { NtfyServicesInterface } from 'App/Interfaces/Services/NtfyServicesInterface'

export default class NtfyServices implements NtfyServicesInterface {
  public async sendNotification({
    topic,
    title = '',
    message = '',
    priority = 5,
    actions,
  }: SendNotificationProps) {
    const body = {
      topic,
      title,
      message,
      Priority: priority,
      actions,
    }
    const response = await ntfyApi.post('/', body)

    return response.data
  }
}
