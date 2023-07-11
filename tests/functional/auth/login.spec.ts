import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { faker } from '@faker-js/faker'
import { basicCredentials, mockCredentials } from '../../helpers'

const url = '/v1/auth/login'

test.group('Login', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be admin login successfully', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockCredentials)

    sut.assertStatus(200)
    sut.assertBodyContains({
      content: {
        accessToken: {
          token: sut.response.body.content.accessToken.token,
        },
      },
    })
    sut.assertBodyContains({
      content: {
        user: {
          permissions: [
            'createPermission',
            'deletePermission',
            'updatePermission',
            'viewPermission',
            'createRole',
            'updateRole',
            'viewRole',
            'deleteRole',
            'syncRolesPermissions',
          ],
        },
      },
    })
    sut.assertBodyContains({
      content: {
        user: {
          roleName: 'ADMIN',
        },
      },
    })
  })
  test('Should is invalid credentials if user doest exists', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json({
        email: 'diretoria@estererafaelapadarialtda.com.br',
        password: '12345',
        deviceName: 'browser',
      })

    sut.assertStatus(401)
    sut.assertBody({ statusCode: 401, message: 'Invalid Credentials' })
  })

  test('Should is invalid credentials if password is incorrect', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json({
        email: 'admin@gmail.com',
        password: 'Admin@11',
        deviceName: 'browser',
      })

    sut.assertStatus(401)
    sut.assertBody({ statusCode: 401, message: 'Invalid Credentials' })
  })
  test('Should be email is empty', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json({
        email: null,
        password: faker.internet.password({ length: 10 }),
        deviceName: 'browser',
      })

    sut.assertStatus(422)
    sut.assertBody({ email: ['required validation failed'] })
  })
  test('Should password is empty', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json({
        email: faker.internet.email(),
        password: null,
        deviceName: 'browser',
      })

    sut.assertStatus(422)
    sut.assertBody({ password: ['required validation failed'] })
  })
  test('Should device name is empty', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json({
        email: faker.internet.email(),
        password: faker.internet.password({ length: 10 }),
        deviceName: null,
      })

    sut.assertStatus(422)
    sut.assertBody({ deviceName: ['required validation failed'] })
  })


  test('Should be empty basic credentials', async ({ client }) => {
    const sut = await client.post(url)

    sut.assertStatus(401)
    sut.assertBodyContains({
      message: 'Please give me basic',
    })
  })

  test('Should be invalid basic credentials', async ({ client }) => {
    const sut = await client.post(url).basicAuth('gtest@gmail.com', '123445')

    sut.assertStatus(401)
    sut.assertBodyContains({
      message: 'Invalid basic crendentials',
    })
  })
})
