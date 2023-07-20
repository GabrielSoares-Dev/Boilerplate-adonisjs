import type { DefaultPaginateDto } from 'App/Dtos/Utils/DefaultPaginateDto'
export interface DefaultPaginateInterface {
  formatToDefaultPaginate<TItems>(paginate: DefaultPaginateDto<TItems>): Promise<{
    currentPage: number
    totalRegisters: number
    totalPages: number
    registersPerPage: number
    items: TItems[]
  }>
}
