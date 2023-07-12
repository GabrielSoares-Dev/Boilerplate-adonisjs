import { UserDto } from 'App/Dtos/UserDto/UserDto'
import Users from 'App/Models/Users'

export default interface UserRepositoryInterface {
  create(user: UserDto): Promise<Users>
  findByEmail(email: string): Promise<Users | null>
  findUserById(id: number): Promise<Users | null>
}
