import type { SimplePaginatorContract } from '@ioc:Adonis/Lucid/Database'
export interface DefaultPaginateDto<TItems> {
  items: TItems[]
  paginateProperties: SimplePaginatorContract<TItems>
}
