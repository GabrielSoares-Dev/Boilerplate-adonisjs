import Roles from 'App/Models/Roles'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Roles, ({ faker }) => {
  return {
    name: faker.person.firstName(),
  }
}).build()
