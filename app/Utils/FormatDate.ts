import type { FormatDateInterface } from 'App/Interfaces/Utils/FormatDateInterface'
import { format } from 'date-fns'

export default class FormatDate implements FormatDateInterface {
  public formatFromIso(date: string): string {
    return format(new Date(date), 'dd/MM/yyyy HH:mm:ss')
  }
}
