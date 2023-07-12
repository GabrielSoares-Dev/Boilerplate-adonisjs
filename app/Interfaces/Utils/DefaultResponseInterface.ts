export interface DefaultResponseInterface {
  success(message: string, statusCode: number): Promise<void | undefined>
  successWithContent(message: string, statusCode: number, content: any): Promise<void | undefined>
}
