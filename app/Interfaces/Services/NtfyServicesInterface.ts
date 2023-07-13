import type { SendNotificationProps } from 'App/Services/types/Http/NtfyServices/SendNotificationProps'
export interface NtfyServicesInterface {
  sendNotification({
    topic,
    title = '',
    message = '',
    priority = 5,
    actions,
  }: SendNotificationProps)
}
