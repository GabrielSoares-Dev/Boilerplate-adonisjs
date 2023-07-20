import { test } from '@japa/runner'
import { checkHasPermission } from 'App/Functions/CheckHasPermission'

test.group('Check has permission', () => {
  test('Should be has permission', async ({ assert }) => {

    const result = await checkHasPermission("createPermission",["createPermission"])

    assert.equal(result, true)
  })
  test('Should be not has permission', async ({ assert }) => {

    const result = await checkHasPermission("deleteRole",["createPermission"])

    assert.equal(result, false)
  })
})
