import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export const viaCepApi = axios.create({
  baseURL: Env.get('VIACEP_API'),
})
