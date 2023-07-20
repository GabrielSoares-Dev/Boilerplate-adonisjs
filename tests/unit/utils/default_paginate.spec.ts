import { test } from '@japa/runner'
import DefaultPaginate from '@ioc:Utils/DefaultPaginate'
import type { SimplePaginatorContract } from '@ioc:Adonis/Lucid/Database'

test.group('Default paginate', () => {
  test('Should be transform paginate from adonis to my format', async ({ assert }) => {
    //@ts-ignore
    const mockPaginator: SimplePaginatorContract<any> = {
      currentPage: 1,
      total: 100,
      lastPage: 10,
      perPage: 10,
    }
    const items = [
      {
        test: 'test',
      },
    ]
    const result = await DefaultPaginate.formatToDefaultPaginate({
      items,
      paginateProperties: mockPaginator,
    })
    console.log(result)

    assert.equal(result.totalRegisters, 100)
    assert.equal(result.currentPage, 1)
    assert.equal(result.totalPages, 10)
    assert.equal(result.registersPerPage, 10)
  })
})
