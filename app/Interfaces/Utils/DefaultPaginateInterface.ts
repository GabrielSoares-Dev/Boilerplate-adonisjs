import type {
  DefaultPaginateDto,
  DefaultPaginateDtoResponse,
} from 'App/Dtos/Utils/DefaultPaginateDto'
export interface DefaultPaginateInterface {
  formatToDefaultPaginate<TItems>(
    paginate: DefaultPaginateDto<TItems>
  ): Promise<DefaultPaginateDtoResponse<TItems>>
}
