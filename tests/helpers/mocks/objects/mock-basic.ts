import Env from '@ioc:Adonis/Core/Env'

export const basicCredentials = {
  username: Env.get('AUTHENTICATOR_USERNAME'),
  password: Env.get('AUTHENTICATOR_PASSWORD'),
}
