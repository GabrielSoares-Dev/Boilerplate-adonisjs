import { faker } from '@faker-js/faker'

const passwordMock = 'Default@12'

export const mockUserObject = {
  name: faker.company.name(),
  email: faker.internet.email(),
  password: passwordMock,
  confirmPassword: passwordMock,
  phoneNumber: faker.phone.number('119########'),
}
