export interface Pagination {
  page: number
  limit: number
  count: number
}
export interface DefaultResponsePlagiarismSearch<TData> {
  status: boolean
  code: number
  data: TData
}
export interface DefaultResponseWithPaginationPlagiarismSearch<TData> {
  status: boolean
  code: number
  data: TData
  pagination: Pagination
}
