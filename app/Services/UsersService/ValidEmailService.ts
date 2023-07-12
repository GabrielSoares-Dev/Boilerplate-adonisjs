import DefaultResponse from '@ioc:Utils/DefaultResponse'
import UserRepository from '@ioc:Repositories/UserRepository'
import CustomException from 'App/Exceptions/CustomException'

export default class ValidEmailService {
  public async validEmail(email: string) {
    const findUserByEmail = await UserRepository.findByEmail(email)

    if (findUserByEmail) {
      throw new CustomException('Email is invalid', 400)
    }
    return await DefaultResponse.success('Email is valid', 200)
  }
}
