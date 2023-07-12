import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Env from '@ioc:Adonis/Core/Env'
import { faker } from '@faker-js/faker'
import {  basicCredentials } from '../../helpers'

const url = '/v1/users/valid-email'
const mockEmail = faker.internet.email()

test.group('Valid email user', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be email is valid', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json({
        email: mockEmail,
      })

    sut.assertStatus(200)
    sut.assertBodyContains({ message: 'Email is valid' })
  })
  test('Should be email is invalid', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json({
        email: 'admin@gmail.com',
      })

    sut.assertStatus(400)
    sut.assertBodyContains({ message: 'Email is invalid' })
  })
  test('Should be is empty field email', async ({ client }) => {
    const sut = await client
      .post(url)
      .basicAuth(basicCredentials.username, basicCredentials.password)

    sut.assertStatus(422)
  })
})
