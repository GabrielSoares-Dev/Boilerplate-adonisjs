import type UserRepositoryInterface from 'App/Interfaces/Repositories/UserRepositoryInterface'
import Users from 'App/Models/Users'
import type { UserDto } from 'App/Dtos/UserDto/UserDto'

export default class UserLucidRepository implements UserRepositoryInterface {
  constructor(private readonly model: typeof Users) {}
  public async create(user: UserDto): Promise<Users> {
    const create = await this.model.create(user)

    return create
  }
  public async findByEmail(email: string): Promise<Users | null> {
    return await this.model.findBy('email', email)
  }

  public async findUserById(id: number): Promise<Users | null> {
    return await this.model.findBy('id', id)
  }
}
