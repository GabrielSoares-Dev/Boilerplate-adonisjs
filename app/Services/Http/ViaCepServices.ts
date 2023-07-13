import CustomException from 'App/Exceptions/CustomException'
import { viaCepApi } from 'App/Services/Apis/ViaCepApi'
import { ViaCepResponse } from 'App/Services/types/Http/ViaCepServices/GetAddressResponse'
import { ViaCepServicesInterface } from 'App/Interfaces/Services/ViaCepServicesInterface'

export default class ViaCepServices implements ViaCepServicesInterface {
  public async getAddress(zipCode: string): Promise<ViaCepResponse | undefined> {
    try {
      const response = await viaCepApi.get<ViaCepResponse>(`ws/${zipCode.replace(/\D/g, '')}/json/`)

      const isInvalidCep = response.data.erro

      if (isInvalidCep) {
        throw new Error('Zipcode is invalid')
      }

      return response.data
    } catch (error) {
      throw new CustomException('Zipcode is invalid', 400)
    }
  }
}
