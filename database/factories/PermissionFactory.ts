import Permissions from 'App/Models/Permissions'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Permissions, ({ faker }) => {
  return {
    name: faker.person.firstName(),
  }
}).build()
