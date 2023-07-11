import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { mockUserObject, basicCredentials } from '../../helpers'

const url = '/v1/users/create'
basicCredentials.username
test.group('Create user', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('Should create user success', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockUserObject)

    sut.assertStatus(201)
    sut.assertBody({
      statusCode: 201,
      message: 'User created successfully',
    })
  })

  test('Should fields empty', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(basicCredentials.username, basicCredentials.password)

    sut.assertStatus(422)
  })

  test('Should generate error because has other user with same email', async ({ client }) => {

    const sut = await client
      .post(url)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json({
        email: 'admin@gmail.com',
      })

    sut.assertStatus(422)
    sut.assertBodyContains({ email: ['unique validation failure'] })
  })

})
