export type Action = 'http' | 'view'
export type Method = 'PUT' | 'GET' | 'POST' | 'DELETE'

interface Actions {
  action: Action
  label: string
  url?: string
  method?: Method
  headers?: any
  body?: any
}
export interface SendNotificationProps {
  topic: string
  title?: string
  message?: string
  priority?: number
  actions?: Actions[]
}
