import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Env from '@ioc:Adonis/Core/Env'
import { basicCredentials, mockCredentials } from '../../helpers'

const url = '/v1/auth/logout'
const urlLogin = '/v1/auth/login'
const urlMe = '/v1/auth/me'

test.group('Logout', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be is logout user', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockCredentials)

    const sut = await client.post(url).bearerToken(login.response.body.content.accessToken.token)
    sut.assertStatus(200)
    sut.assertBodyContains({ message: 'User successfully logged out' })
  })
  test('Should be verify is token turn invalid', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockCredentials)

    await client.post(url).bearerToken(login.response.body.content.accessToken.token)
    const sut = await client.get(urlMe).bearerToken(login.response.body.content.accessToken.token)

    sut.assertStatus(401)
    sut.assertBodyContains({ message: 'Unauthorized' })
  })
})
