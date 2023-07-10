import DefaultResponse from 'App/Utils/DefaultResponse'
import UserLucidRepository from 'App/Repositories/UserRepository/UserLucidRepository'
import CustomException from 'App/Exceptions/CustomException'

export default class ValidEmailService {
  constructor(
    private readonly defaultResponse: DefaultResponse,
    private readonly userRepository: UserLucidRepository
  ) {
    this.userRepository = userRepository
    this.defaultResponse = defaultResponse
  }

  public async validEmail(email: string) {
    const findUserByEmail = await this.userRepository.findByEmail(email)

    if (findUserByEmail) {
      throw new CustomException('Email is invalid', 400)
    }
    return await this.defaultResponse.success('Email is valid', 200)
  }
}
