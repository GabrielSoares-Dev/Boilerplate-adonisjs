import type { DefaultResponsePlagiarismSearch } from './DefaultResponse'

export interface Data {
  id: number
  remote_id: string
  user_id: number
  title: string
  text: string
  created: number
  modified: number
  notified: number
  status: number
  filter_chars: number
  filter_references: number
  filter_quotes: number
  language: string
  plagiat: any
  similarity: any
  originality: any
  search_web: number
  search_files_api: number
  search_storage: number
  storage_id: number
  status_ex: string
  file: any
  link: any
  files: any
}
export interface CreateReportResponse extends DefaultResponsePlagiarismSearch<Data> {}
