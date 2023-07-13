import type { SendNotificationProps } from 'App/Services/types/Http/NtfyServices/SendNotificationProps'
export interface NtfyServicesInterface {
  sendNotification(body: SendNotificationProps)
}
