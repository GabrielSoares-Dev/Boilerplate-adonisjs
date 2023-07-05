import { AssetsConfig } from '@ioc:Adonis/Core/Static'

const staticConfig: AssetsConfig = {
  enabled: true,
  dotFiles: 'ignore',
  etag: true,
  lastModified: true,
  maxAge: 0,
  immutable: false,
}

export default staticConfig
