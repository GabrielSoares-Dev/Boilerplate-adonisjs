import type { ViaCepResponse } from 'App/Services/types/Http/ViaCepServices/GetAddressResponse'
export interface ViaCepServicesInterface {
  getAddress(zipCode: string): Promise<ViaCepResponse | undefined>
}
