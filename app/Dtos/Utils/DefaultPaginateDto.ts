import type { SimplePaginatorContract } from '@ioc:Adonis/Lucid/Database'
export interface DefaultPaginateDto<TItems> {
  items: TItems[]
  paginateProperties: SimplePaginatorContract<TItems>
}
export interface DefaultPaginateDtoResponse<TItems> {
  currentPage: number
  totalRegisters: number
  totalPages: number
  registersPerPage: number
  items: TItems[]
}
