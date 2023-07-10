import type { DefaultResponsePlagiarismSearch } from './DefaultResponse'

export interface Data {
  id: number
  remote_id: string
  user_id: number
  title: string
  text: string
  length: number
  length_raw: number
  created: number
  modified: number
  notified: number
  status: number
  filter_chars: number
  filter_references: number
  filter_quotes: number
  language: string
  plagiat: number
  similarity: number
  originality: number
  search_web: number
  search_files_api: number
  search_storage: number
  status_ex: string
  file: string
  link: string
  files: File[]
}

export interface File {
  url: string
  type: string
  language: string
  version: number
}

export interface GetReportByIdResponse extends DefaultResponsePlagiarismSearch<Data> {}
