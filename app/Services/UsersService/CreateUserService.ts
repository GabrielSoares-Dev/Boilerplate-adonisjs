import DefaultResponse from '@ioc:Utils/DefaultResponse'
import RoleRepository from '@ioc:Repositories/RoleRepository'
import UserRepository from '@ioc:Repositories/UserRepository'
import type { CreateUserDto } from 'App/Dtos/UserDto/CreateUserDto'

export default class CreateUserService {
  public async create({ name, email, password, phoneNumber }: CreateUserDto) {
    const roleAdmin = await RoleRepository.findByName('ADMIN')

    const user = {
      name,
      email,
      phoneNumber: phoneNumber.replace(/\D/g, ''),
      password,
      roleName: 'ADMIN',
      roleId: roleAdmin!.id,
    }

    await UserRepository.create(user)

    return await DefaultResponse.success('User created successfully', 201)
  }
}
