import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import PermissionFactory from 'Database/factories/PermissionFactory'
import Env from '@ioc:Adonis/Core/Env'
import { faker } from '@faker-js/faker'
import { basicCredentials, mockCredentials } from '../../helpers'

const url = '/v1/permissions/create'
const urlLogin = '/v1/auth/login'
test.group('Create permissions', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be create a permission', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockCredentials)
    const sut = await client
      .post(url)
      .bearerToken(login.response.body.content.accessToken.token)
      .json({
        name: faker.person.middleName(),
      })

    sut.assertStatus(201)
    sut.assertBodyContains({ message: 'Permission created successfully' })
  })

  test('Should be already exists name permission', async ({ client }) => {
    const login = await client
    .post(urlLogin)
    .basicAuth(basicCredentials.username, basicCredentials.password)
    .json(mockCredentials)
    const permission = await PermissionFactory.create()
    const sut = await client
      .post(url)
      .bearerToken(login.response.body.content.accessToken.token)
      .json({
        name: permission.name,
      })

    sut.assertStatus(422)
    sut.assertBody({ name: ['unique validation failure'] })
  })
  // test('Should be a unathorized action', async ({ client }) => {
  //   const login = await client
  //   .post(urlLogin)
  //   .basicAuth(basicCredentials.username, basicCredentials.password)
  //   .json(mockCredentials)
  //   const permission = await PermissionFactory.create()
  //   const sut = await client
  //     .post(url)
  //     .bearerToken(login.response.body.content.accessToken.token)
  //     .json({
  //       name: permission.name,
  //     })

  //   sut.assertStatus(403)
  //   sut.assertBodyContains({ message: 'Access to this resource is denied' })
  // })
})
