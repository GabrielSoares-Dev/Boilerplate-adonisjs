import { test } from '@japa/runner'

test.group('Health', () => {
  test('Endpoint working', async ({ client }) => {
    const sut = await client.get('/health')

    sut.assertStatus(200)
  })
})
