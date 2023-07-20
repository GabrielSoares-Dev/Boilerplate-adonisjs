import { test } from '@japa/runner'
import FormatDate from '@ioc:Utils/FormatDate'

test.group('Format date', () => {
  test('Should be transform format iso date in brazilian date', async ({ assert }) => {
    const result = await FormatDate.formatFromIso('2023-07-19T22:40:44.416Z')

    assert.equal(result, '19/07/2023 19:40:44')
  })
})
