import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export const ntfyApi = axios.create({
  baseURL: Env.get('NTFY_API'),
})
