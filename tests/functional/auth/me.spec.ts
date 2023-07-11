import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { basicCredentials, mockCredentials } from '../../helpers'

const url = '/v1/auth/me'
const urlLogin = '/v1/auth/login'

test.group('Me', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })


  test('Should be is returned user admin informations', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockCredentials)

    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)
    sut.assertStatus(200)
    sut.assertBodyContains({ message: 'User information successfully returned' })
    sut.assertBodyContains({
      content: {
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
    })
    sut.assertBodyContains({
      content: {
        roleName: 'ADMIN',
      },
    })
  })
  test('Should be is unathorized', async ({ client }) => {
    const sut = await client.get(url)

    sut.assertStatus(401)
    sut.assertBodyContains({ message: 'Unauthorized' })
  })
})
