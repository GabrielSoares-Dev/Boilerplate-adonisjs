import type { DefaultPaginateInterface } from 'App/Interfaces/Utils/DefaultPaginateInterface'
import type { DefaultPaginateDto } from 'App/Dtos/Utils/DefaultPaginateDto'

export default class DefaultPaginate implements DefaultPaginateInterface {
  public async formatToDefaultPaginate<TItems>({
    paginateProperties,
    items,
  }: DefaultPaginateDto<TItems>) {
    return {
      currentPage: paginateProperties.currentPage,
      totalRegisters: paginateProperties.total,
      totalPages: paginateProperties.lastPage,
      registersPerPage: paginateProperties.perPage,
      items,
    }
  }
}
